"use client"

import { Diary } from "@/components/diary"
import { PartialLoading } from "@/components/spinner"
import { usePostsMyDiarys } from "@/hooks/query/post"
import { DiaryTypes } from "@/types/my-diarys"
import { format, parse } from "date-fns"
import { ko } from "date-fns/locale"
import Image from "next/image"

export default function RenderMydiary({ userId }: { userId?: string }) {
  const { data, isPending } = usePostsMyDiarys("mydiary", Number(userId))

  const convertTime = (inputDate: string) => {
    const parsedDate = parse(inputDate, "yyyy.MM.dd", new Date())
    return format(parsedDate, "M월 d일 EEEE", { locale: ko })
  }

  const dates = data ? Object.keys(data) : []
  return (
    <div className="pt-16 pb-20">
      {isPending ? (
        <div className="h-[80vh] ">
          <PartialLoading />
        </div>
      ) : dates?.length ? (
        dates.map((dateKey: string) => {
          const datas = data![dateKey]
          return (
            <div key={dateKey} className="m-6">
              <h2 className="text-primary mb-1">{convertTime(dateKey)}</h2>
              <div className="bg-backgroundLighter rounded-xl">
                {
                  // 날짜별 일기 수 만큼 반복
                  datas.map((data: DiaryTypes, index: number) => (
                    <Diary
                      key={data._id}
                      diaryData={data}
                      index={index}
                      totalLength={datas.length}
                    />
                  ))
                }
              </div>
            </div>
          )
        })
      ) : (
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
    </div>
  )
}
