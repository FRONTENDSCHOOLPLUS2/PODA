import { postRequest } from "@/lib/protocol"
import NextAuth from "next-auth"
import CredentailsProvider from "next-auth/providers/credentials"
import google from "next-auth/providers/google"
import github from "next-auth/providers/github"

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
            extra: {
              interest: user.extra.interest,
              isOnboarding: user.extra.isOnboarding,
            },
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
    async signIn({ user }) {
      if (user.error) {
        throw new Error(user.error)
      }
      return true
    },

    async jwt({ token, user, account, trigger, session }) {
      if (user) {
        token._id = user._id
        token.isOnboarding = user.extra?.isOnboarding
        token.interest = user.extra?.interest
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
      }

      if (account?.provider) {
        token.loginType = account.provider
      }

      if (account?.providerAccountId) {
        token.providerAccountId = account.providerAccountId
      }

      if (trigger === "update" && session) {
        token._id = session._id
        token.isOnboarding = true
        token.interest = session.extra.interest
        token.accessToken = session.token.accessToken
        token.refreshToken = session.token.refreshToken
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
      }
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      return session
    },
  },
})
