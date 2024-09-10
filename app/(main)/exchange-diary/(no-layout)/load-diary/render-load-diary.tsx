"use client"

import { ExchangeDiary } from "@/app/(main)/_components/exchange-diary"
import { Spacer } from "@/components/spacer"
import { FullScreen } from "@/components/spinner"
import { usePostsExchangeMyDiarys } from "@/hooks/query/post"
import { useSelectedDiary } from "@/hooks/store/use-selected-diary"
import { convertDate } from "@/lib/function"
import { DiaryTypes } from "@/types/my-diarys"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function RenderLoadDiary({ userId }: { userId?: string }) {
  const { setSelectDiary, setDate } = useSelectedDiary()

  const { data, isPending } = usePostsExchangeMyDiarys(
    "mydiary",
    Number(userId)
  )

  const pathname = usePathname()

  const handleSelectDiary = (diary: DiaryTypes[], date: string) => {
    if (pathname === "/exchange-diary/load-diary") {
      setSelectDiary(diary)
      setDate(date)
    }
  }

  return (
    <div className="w-full h-full space-y-5 pt-[60px]">
      {!data && isPending && <FullScreen />}
      {!data && !isPending && (
        <div className="flex flex-col justify-center items-center mt-28">
          <Image
            src={"/assets/no-diary.png"}
            width={160}
            height={160}
            alt="다이어리 없을때 이미지"
          />
          <h2 className="mt-6 text-[#c4c4c4]">일기를 작성해주세요</h2>
        </div>
      )}
      {data &&
        !isPending &&
        Object.keys(data).map((date) => (
          <div
            key={date}
            className="m-6"
            onClick={() => handleSelectDiary(data[date], date)}>
            <h3 className="text-primary mb-1">{convertDate(date)}</h3>
            <ExchangeDiary key={date} diaryDatas={data[date]} />
          </div>
        ))}
      <Spacer />
    </div>
  )
}
