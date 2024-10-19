"use client"

import { Diary } from "@/components/diary"
import { PartialLoading } from "@/components/spinner"
import { usePostsMyDiarys } from "@/hooks/query/post"
import { convertTime, sortMyDiarys } from "@/lib/function"
import { DiaryTypes } from "@/types/my-diarys"
import { EmptyDiary } from "./empty-diary"

export default function RenderMydiary({
  diaryData,
  isPending,
}: {
  diaryData: any
  isPending: boolean
}) {
  const dates = diaryData ? Object.keys(diaryData) : [] // ['2024.10.04', '2024.10.02']
  return (
    <div className="pt-16 pb-20">
      {isPending ? (
        <div className="h-[80vh] ">
          <PartialLoading />
        </div>
      ) : dates?.length ? (
        dates.map((dateKey: string) => {
          const datas = diaryData![dateKey]
          return (
            <div key={dateKey} id={dateKey} className="m-6">
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
        <EmptyDiary />
      )}
    </div>
  )
}
