"use client"

import { Switch } from "@/components/ui/switch"
import { useInterestSheet } from "@/hooks/store/use-interest-sheet"

import { fetcher } from "@/lib/protocol"
import { Bell, LucideIcon, LucideProps } from "lucide-react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import React from "react"

interface SwitchItemProps {
  title: string
  Icon: LucideIcon
  value?: boolean
  onClick?: () => void
}

export const SwitchItem = ({
  title,
  Icon,
  value,
  onClick,
}: SwitchItemProps) => {
  const { onOpen } = useInterestSheet()

  const router = useRouter()

  const handleClick = () => {
    switch (title) {
      case "관심사 변경":
        onOpen()
        break
      case "로그아웃":
        signOut({ redirect: false }).then(() => {
          localStorage.removeItem("token")
          localStorage.removeItem("accessToken")
          router.push("/")
        })
        break
      default:
        break
    }
  }

  return (
    <div
      onClick={handleClick}
      className="rounded-md flex justify-between bg-backgroundLighter py-[12px] px-[12px] ">
      <div className="flex space-x-2 ">
        <Icon color="#ffffff" width={24} height={24} />
        <h3 className="text-md">{title}</h3>
      </div>
      {title !== "관심사 변경" && title !== "로그아웃" && (
        <Switch checked={value} onCheckedChange={onClick} />
      )}
    </div>
  )
}
