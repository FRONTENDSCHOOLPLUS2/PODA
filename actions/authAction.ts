"use server"
import { signIn, update } from "@/app/auth"
import { postRequest } from "@/lib/protocol"
import { SignupForm } from "@/types/user"
import { redirect } from "next/navigation"

const SERVER = process.env.NEXT_PUBLIC_API_URL

export async function signInWithCredentials(
  formData: Pick<SignupForm, "email" | "password">
) {
  let isOnboarding
  try {
    await signIn("credentials", {
      email: formData.email || "",
      password: formData.password || "",
      redirect: false,
    })

    const resLogin = await postRequest(`/users/login`, {
      email: formData.email || "",
      password: formData.password || "",
    })

    if (!resLogin.ok) {
      console.log(`authAction의 resLogin 에러 : `, resLogin)
    }

    isOnboarding = resLogin?.item?.extra?.isOnboarding

    if (!isOnboarding) {
      await update(resLogin.item)
    }

    const resMutateUser = await fetch(`${SERVER}/users/${resLogin.item._id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${resLogin.item.token.accessToken}`,
        "Content-Type": "application/json",
        "client-id": "09-triots",
      },
      body: JSON.stringify({
        extra: {
          ...resLogin.item.extra,
          isOnboarding: true,
        },
      }),
    })

    if (!resMutateUser.ok) {
      console.log(`authAction의 resMustateUser 에러 : `, resMutateUser)
    }
  } catch (error) {
    return JSON.parse(JSON.stringify(error))
  }

  if (!isOnboarding) {
    redirect("/welcome")
  } else {
    redirect("/mydiary")
  }
}

export async function signInWithGoogle(formData: FormData) {
  const interest = formData.getAll("interest")
  const encodedInterest = interest.map((category) =>
    encodeURIComponent(category as string)
  )

  await signIn("google", {
    redirectTo: `/api/oauth-signup?age=${encodeURIComponent(
      formData.get("age") as string
    )}&gender=${encodeURIComponent(
      formData.get("gender") as string
    )}&region=${encodeURIComponent(
      formData.get("region") as string
    )}&interest=${encodedInterest}`,
  })
}

export async function signInWithGithub(formData: FormData) {
  const interest = formData.getAll("interest")
  const encodedInterest = interest.map((category) =>
    encodeURIComponent(category as string)
  )

  await signIn("github", {
    redirectTo: `/api/oauth-signup?age=${encodeURIComponent(
      formData.get("age") as string
    )}&gender=${encodeURIComponent(
      formData.get("gender") as string
    )}&region=${encodeURIComponent(
      formData.get("region") as string
    )}&interest=${encodedInterest}`,
  })
}
