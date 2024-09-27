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
    const refreshTokenExpired = data?.user.extra?.refreshTokenExpired

    const signout = async () => {
      await signOut({ callbackUrl: "/login" })
    }

    if (refreshTokenExpired) {
      alert("토큰이 만료되었습니다. 다시 로그인해 주세요.")
      signout()
      localStorage.removeItem("token")
      localStorage.removeItem("accessToken")
    }
  }, [data?.user.extra?.refreshTokenExpired])

  return <>{children}</>
}
