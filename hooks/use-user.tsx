"use client"

import { useCurrentSession } from "./use-current-session"

export const useUser = () => {
  const { data } = useCurrentSession()

  if (!data) {
    return undefined
  }

  return data.user
}
