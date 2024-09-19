import { auth } from "@/app/auth"
import { postRequest } from "@/lib/protocol"
import { NextRequest, NextResponse } from "next/server"

const SERVER = process.env.NEXT_PUBLIC_API_URL

export async function GET(request: NextRequest) {
  const session = await auth()

  try {
    const resLogin = await postRequest("/users/login/with", {
      providerAccountId: session?.user?.providerAccountId,
    })

    if (!resLogin.ok) throw new Error("oauth-signup route.ts의 resLogin 에러")

    const isOnboarding = resLogin.item.extra.isOnboarding

    const resMutateUser = await fetch(`${SERVER}/users/${resLogin.item._id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${resLogin.item.token.accessToken}`,
        "Content-Type": "application/json",
        "client-id": "09-triots",
      },
      body: JSON.stringify({
        refreshToken: resLogin?.item?.token?.refreshToken,
        extra: {
          ...resLogin.item.extra,
          isOnboarding: true,
        },
      }),
    })

    if (!resMutateUser.ok)
      throw new Error("oauth-signup route.ts의 resMustateUser 에러")

    if (!isOnboarding) {
      return NextResponse.redirect(`${request.nextUrl.origin}/welcome`)
    } else {
      return NextResponse.redirect(`${request.nextUrl.origin}/mydiary`)
    }
  } catch (error) {
    console.error(error)
  }
}
