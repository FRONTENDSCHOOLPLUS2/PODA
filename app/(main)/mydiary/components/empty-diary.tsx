import Image from "next/image"
import React from "react"

export const EmptyDiary = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-28">
      <Image
        src={"/assets/no-diary.png"}
        width={160}
        height={160}
        alt="다이어리 없을때 이미지"
      />
      <h2 className="mt-6 text-[#c4c4c4]">일기를 작성해주세요</h2>
    </div>
  )
}
