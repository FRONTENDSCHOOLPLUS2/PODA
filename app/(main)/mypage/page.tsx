"use client"

import { Bell, Camera, LucideIcon, Palette, LogOut } from "lucide-react"
import { Half2Icon } from "@radix-ui/react-icons"
import React from "react"
import { SwitchItem } from "./switch-item"
import { Footer } from "@/components/footer"
import { useUserInfo } from "@/hooks/query/user"

import { patchRequest } from "@/lib/protocol"
import { apiKeys } from "@/lib/api-keys"
import { useCurrentSession } from "@/hooks/use-current-session"

export default function MyPagePage() {
  const { data: userData } = useCurrentSession()
  const { data, refetch } = useUserInfo(userData?.user?._id as string)

  const mypageItems = [
    {
      id: 1,
      Icon: Bell,
      title: "푸시 알람 동의",
      value: data?.item?.extra?.pushNotification,
      onClick: async () => {
        if (!data.item.extra.pushNotification) {
          const res = await patchRequest(
            `${apiKeys.users}/${userData?.user?._id}`,
            {
              extra: { ...data.item.extra, pushNotification: true },
            }
          )
          console.log("res: ", res)
        } else {
          const res = await patchRequest(
            `${apiKeys.users}/${userData?.user?._id}`,
            {
              extra: { ...data.item.extra, pushNotification: false },
            }
          )
          console.log("res: ", res)
        }
        refetch()
      },
    },
    {
      id: 2,
      Icon: Camera,
      title: "카메라 접근 권한 동의",
    },
    {
      id: 3,
      Icon: Half2Icon,
      title: "다크 모드",
    },
    {
      id: 4,
      Icon: Palette,
      title: "관심사 변경",
    },
    {
      id: 5,
      Icon: LogOut,
      title: "로그아웃",
    },
  ]

  const renderItem = mypageItems.map((item) => (
    <SwitchItem
      key={item.id}
      title={item.title}
      Icon={item.Icon as LucideIcon}
      value={item.value}
      onClick={item.onClick}
    />
  ))

  return (
    <div className="w-full pb-[64px] h-dvh pt-[24px] flex flex-col justify-between">
      <div className="w-full h-full">
        <h1 className="font-black mb-[12px] px-[24px]">내 정보</h1>
        <div className="w-full h-full flex flex-col space-y-3 px-[24px]">
          {renderItem}
        </div>
      </div>
      <Footer />
    </div>
  )
}
