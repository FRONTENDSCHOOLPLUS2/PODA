"use server"

import { postRequest } from "@/lib/protocol"
import { SignupForm } from "@/types/user"

const SERVER = process.env.NEXT_PUBLIC_API_URL

export async function signup(formData: SignupForm) {
  const res = await postRequest(`${SERVER}/users`, formData)

  return res
}
