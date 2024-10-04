"use client"

import Image from "next/image"
import { Dropdown } from "@/components/dropdown"
import { DiaryTag } from "@/components/diary-tag"
import { usePathname, useRouter } from "next/navigation"
import { DiaryTypes } from "@/types/my-diarys"
import { getImgByMood, getKoTime, getTxtByMood } from "@/lib/function"

type DiaryProps = {
  diaryData: DiaryTypes
  index: number
  totalLength: number
}

export const Diary = ({ diaryData, index, totalLength }: DiaryProps) => {
  const SERVER = process.env.NEXT_PUBLIC_API_URL
  const { back } = useRouter()
  const pathname = usePathname()

  const getImageWidth = () => {
    const count = diaryData?.extra?.attach?.length
    if (count) {
      if (count === 1) return "w-full h-64"
      if (count === 2 || count === 4) return "w-[calc(50%-4px)] h-36"
      if (count === 3 || count >= 5) return "w-[calc(33%-5px)] h-20"
    }
    return ""
  }

  return (
    <div
      key={diaryData._id}
      onClick={() => pathname === "/exchange-diary/load-diary" && back()}
      className="pt-[16px] first:pt-[28px] last:pb-[28px]">
      <div className="flex gap-3 px-6 relative">
        {/* 드롭다운 메뉴 */}
        <div className="absolute right-1 -top-[6px] text-primary">
          <Dropdown diaryData={diaryData} />
        </div>
        {/* 왼쪽 */}
        <div className="flex items-center flex-col flex-shrink-0">
          <div>
            <Image
              width={48}
              height={48}
              src={getImgByMood(diaryData.extra.mood)}
              alt="감정 이미지"
            />
          </div>
          {/* 이모션 세로 선 */}
          <div className="flex flex-col h-full pt-[16px]">
            {totalLength > 1 && index < totalLength - 1 && (
              <div className="h-full border-[1.2px] border-[#666666]"></div>
            )}
          </div>
        </div>
        {/* 오른쪽 */}
        <div className="flex flex-col">
          {/* 이미지텍스트, 시간 */}
          <div className="flex gap-2 items-center mb-1">
            <h2 className={`text-md text-emotion-${diaryData.extra.mood}`}>
              {getTxtByMood(diaryData.extra.mood)}
            </h2>
            <div className="text-secondary text-sm">
              {getKoTime(diaryData.createdAt)}
            </div>
          </div>
          {/* 상황 태그들 */}
          <ul
            className={`flex gap-1 flex-wrap mb-4 text-emotion-${diaryData.extra.mood}`}>
            {diaryData.extra.tag.map((tagName) => (
              <DiaryTag key={tagName} tagName={tagName} />
            ))}
          </ul>

          {/* 디스크립션 */}
          <div className="mb-2">
            {diaryData.extra.title && <h3>{diaryData.extra.title}</h3>}
            {diaryData.extra.content && (
              <p className="text-primary text-xs">{diaryData.extra.content}</p>
            )}
          </div>
          {/* 업로드한 이미지 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {diaryData.extra.attach?.map((file) => (
              <div key={file} className={getImageWidth()}>
                <Image
                  src={`${SERVER}/${file}`}
                  alt={`Preview ${file}`}
                  width={200}
                  height={200}
                  className="rounded w-full h-full object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
