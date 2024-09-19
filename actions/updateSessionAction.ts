"use server"

import { update } from "@/app/auth"

export async function updateSession(sessionBody: any) {
  await update(sessionBody)
}
