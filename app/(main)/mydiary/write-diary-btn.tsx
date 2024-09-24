"use client"
import React from "react"
import { Pencil } from "lucide-react"
import { useRouter } from "next/navigation"
import { useDiaryValues } from "@/hooks/store/use-diary"

export const WriteDiaryBtn = () => {
  const { push } = useRouter()
  const { resetValues } = useDiaryValues()
  const handleBtnClick = () => {
    resetValues()
    push("/mydiary/new/write-diary")
  }
  return (
    <div className="fixed bottom-28 right-4 z-10 bg-mainColor p-3 rounded-full">
      <div className=" boxshadow" onClick={handleBtnClick}>
        <Pencil size={28} />
      </div>
    </div>
  )
}
