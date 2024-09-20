import { postRequest } from "@/lib/protocol"
import NextAuth from "next-auth"
import CredentailsProvider from "next-auth/providers/credentials"
import google from "next-auth/providers/google"
import github from "next-auth/providers/github"
import jwt, { JwtPayload } from "jsonwebtoken"

const SERVER = process.env.NEXT_PUBLIC_API_URL
const AUTH_SECRET = process.env.AUTH_SECRET

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update,
} = NextAuth({
  providers: [
    CredentailsProvider({
      async authorize(credentials) {
        const res = await postRequest(`${SERVER}/users/login`, credentials)

        if (res.ok) {
          const user = res.item
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            type: user.type,
            image: user.image && SERVER + user.image,
            accessToken: user.token.accessToken,
            refreshToken: user.token.refreshToken,
            interest: user.extra.interest,
            isOnboarding: user.extra.isOnboarding,
            refreshTokenExpired: false,
          }
        } else if (!res.ok) {
          return { error: res.message }
        }
        return null
      },
    }),
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (user.error) {
        throw new Error(user.error)
      }

      switch (account?.provider) {
        case "google":
        case "github":
          let userInfo
          try {
            const resSignup = await postRequest("/users/signup/oauth", {
              name: user?.name,
              email: user?.email,
              image: user.image,
              type: "seller",
              loginType: account.provider,
              extra: {
                providerAccountId: account.providerAccountId,
                interest: [],
                isOnboarding: false,
              },
            })

            const resLogin = await postRequest("/users/login/with", {
              providerAccountId: account.providerAccountId,
            })
            if (resLogin.ok) {
              userInfo = resLogin.item
            } else if (!resLogin.ok)
              throw new Error("oauth-signup route.ts의 resLogin 에러")
          } catch (error) {
            console.error(error)
          }

          user._id = String(userInfo._id)
          user.interest = userInfo.extra.interest
          user.isOnboarding = userInfo.extra.isOnboarding
          user.refreshTokenExpired = false
          user.accessToken = userInfo.token.accessToken
          user.refreshToken = userInfo.token.refreshToken

          break
      }
      return true
    },

    async jwt({ token, user, account, trigger, session }) {
      if (user) {
        token._id = user._id
        token.interest = user.interest
        token.isOnboarding = user.isOnboarding
        token.refreshTokenExpired = user.refreshTokenExpired
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
      }

      if (account?.provider) {
        token.loginType = account.provider
      }

      if (account?.providerAccountId) {
        token.providerAccountId = account.providerAccountId
      }

      if (trigger === "update" && session.key === "interest") {
        token.interest = session.interest
      }

      const decodedToken = jwt.decode(
        token.accessToken as string
      ) as JwtPayload | null

      const accessTokenExpires = decodedToken?.exp
        ? decodedToken?.exp * 1000
        : 0

      const shouldRefreshToken = Date.now() > accessTokenExpires

      if (shouldRefreshToken) {
        try {
          console.log("토큰 만료됨.", Date.now() + " > " + accessTokenExpires)
          const res = await fetch(`${SERVER}/auth/refresh`, {
            headers: {
              "client-id": "09-triots",
              Authorization: `Bearer ${token.refreshToken}`,
            },
          })
          if (res.ok) {
            const resJson = await res.json()
            return {
              ...token,
              refreshTokenExpired: false,
              accessToken: resJson.accessToken,
            }
          } else {
            if (res.status === 401) {
              console.log(
                "리플래시 토큰 인증 실패. 로그인 페이지로 이동",
                await res.json()
              )
              return {
                ...token,
                refreshTokenExpired: true,
              }
            }
          }
        } catch (error) {
          if (error instanceof Error) {
            console.error(error)
            return {
              ...token,
              error: error.message,
            }
          }
        }
      } else {
        // console.log(`액세스 토큰 ${accessTokenExpires - Date.now()} ms 남음`)
      }

      return token
    },
    async session({ session, token }) {
      session.user.loginType = token.loginType
      session.user.providerAccountId = token.providerAccountId
      session.user._id = token._id
      session.user.extra = {
        interest: token.interest,
        isOnboarding: token.isOnboarding,
        refreshTokenExpired: token.refreshTokenExpired,
      }
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      return session
    },
  },
})
