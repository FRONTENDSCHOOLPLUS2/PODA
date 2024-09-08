"use client"

import { ExchangeDiary } from "@/app/(main)/_components/exchange-diary"
import { AvatarName } from "@/components/avatar-name"
import { NavigationHeader } from "@/components/navigation-header"
import { Spacer } from "@/components/spacer"
import { FullScreen } from "@/components/spinner"
import { Button } from "@/components/ui/button"
import { usePostsDiarys } from "@/hooks/query/post"
import { useSelectedDiary } from "@/hooks/store/use-selected-diary"
import { useTarget } from "@/hooks/store/use-target"
import { useUser } from "@/hooks/use-user"
import { getKoDate, getKoYearDate } from "@/lib/function"
import { cn } from "@/lib/utils"
import { DiaryTypes } from "@/types/my-diarys"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import React from "react"

export default function StorageIdPage() {
  const param = useParams()
  const { data, isPending } = usePostsDiarys(
    "exchange-diary",
    parseInt(param.id as string)
  )

  const { target } = useTarget()
  const { setProductId } = useSelectedDiary()
  const { push } = useRouter()
  const user = useUser()

  const handleResendDiary = () => {
    setProductId(parseInt(param.id as string))
    push("/exchange-diary/load-diary")
  }

  const renderListItem =
    data &&
    Object.entries(data as Record<string, DiaryTypes[]>)?.map((item) => {
      console.log("item: ", item[0])
      return (
        <div className="w-full space-y-1.5" key={item[0]}>
          <div
            className={cn(
              "flex justify-between items-end ",
              item[1][0].user.name !== user?.name && "flex-row-reverse"
            )}>
            <AvatarName
              name={item[1][0].user.name}
              image={item[1][0].user.image}
            />
            <p className="text-sm text-primary font-semibold">
              {getKoYearDate(item[0])}
              {/* {format(item[0], "M월 d일 EEEE", { locale: ko })} */}
            </p>
          </div>
          <ExchangeDiary diaryDatas={item[1]} />
        </div>
      )
    })

  return (
    <div className="w-full h-dvh relative ">
      {!data && isPending && <FullScreen />}
      {!data && !isPending && (
        <div w-full h-full>
          <Image src="/asset/exchange-diary" width={100} height={100} alt="" />
        </div>
      )}

      <NavigationHeader isBack />
      <div className="h-full space-y-8 px-[24px] pt-[80px]">
        {renderListItem}
        <Spacer />
      </div>
      <div className="w-full fixed bottom-0 mb-[24px] px-[24px]">
        <Button
          onClick={handleResendDiary}
          className="w-full bg-mainColor rounded-lg text-black font-black">
          내 일기 전달하기
        </Button>
      </div>
    </div>
  )
}
