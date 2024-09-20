"use server"
import { signIn } from "@/app/auth"
import { SignupForm } from "@/types/user"

export async function signInWithCredentials(
  formData: Pick<SignupForm, "email" | "password">
) {
  try {
    const response = await signIn("credentials", {
      email: formData.email || "",
      password: formData.password || "",
      redirect: false,
    })
    return response
  } catch (error) {
    return JSON.parse(JSON.stringify(error))
  }
}

export async function signInWithGoogle(formData: FormData) {
  await signIn("google", {
    redirectTo: `/api/oauth-signup`,
  })
}

export async function signInWithGithub(formData: FormData) {
  await signIn("github", {
    redirectTo: `/api/oauth-signup`,
  })
}
