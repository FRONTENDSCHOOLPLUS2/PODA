"use client"

import React, { useEffect } from "react"

import { useCurrentSession } from "@/hooks/use-current-session"
import { signOut } from "next-auth/react"

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, status } = useCurrentSession()
  console.log("data: ", data)

  useEffect(() => {
    if (data?.accessToken && status === "authenticated") {
      localStorage.setItem("accessToken", data.accessToken)
    }
  }, [data, status])

  useEffect(() => {
    const tokenExpired = data?.user.extra?.tokenExpired

    const signout = async () => {
      await signOut({ callbackUrl: "/login" })
    }

    if (tokenExpired) {
      signout()
      localStorage.removeItem("token")
      localStorage.removeItem("accessToken")
    }
  }, [data?.user.extra?.tokenExpired])

  return <>{children}</>
}
