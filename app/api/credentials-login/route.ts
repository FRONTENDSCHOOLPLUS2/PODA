import { auth } from "@/app/auth"
import { NextRequest, NextResponse } from "next/server"

const SERVER = process.env.NEXT_PUBLIC_API_URL

export async function GET(request: NextRequest, response: NextResponse) {
  const session = await auth()

  try {
    const isOnboarding = session?.user.extra?.isOnboarding

    const resMutateUser = await fetch(`${SERVER}/users/${session?.user._id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
        "client-id": "09-triots",
      },
      body: JSON.stringify({
        refreshToken: session?.refreshToken,
        extra: {
          ...session?.user.extra,
          isOnboarding: true,
        },
      }),
    })

    if (!resMutateUser.ok) {
      console.log(`authAction의 resMustateUser 에러 : `, resMutateUser)
    }

    if (!isOnboarding) {
      return NextResponse.redirect(`${request.nextUrl.origin}/welcome`)
    } else {
      return NextResponse.redirect(`${request.nextUrl.origin}/mydiary`)
    }
  } catch (error) {
    console.error(error)
  }
}
