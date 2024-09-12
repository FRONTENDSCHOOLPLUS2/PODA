"use client"
import { NavigationHeader } from "@/components/navigation-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useDiaryValues } from "@/hooks/store/use-diary"

import { Separator } from "@radix-ui/react-dropdown-menu"
import { useRouter } from "next/navigation"
import React, { ChangeEvent } from "react"

export default function WriteNotePage() {
  const { back, push } = useRouter()
  const { noteContentVal, noteTitleVal, seter } = useDiaryValues()

  const handleContentVal = (e: ChangeEvent<HTMLTextAreaElement>) => {
    seter(e.target.value, "noteContentVal")
  }
  const handleTitleVal = (e: ChangeEvent<HTMLInputElement>) => {
    seter(e.target.value, "noteTitleVal")
  }
  const handleSaveBtn = () => {
    seter(noteTitleVal, "noteTitleVal")
    seter(noteContentVal, "noteContentVal")
    seter(2, "step")
    back()
  }

  return (
    <div>
      <NavigationHeader isBack isEditWriteNote />

      <div className="p-6 pt-16">
        <Input
          placeholder="제목 입력..."
          className="mb-2 outline-none border-none placeholder:text-3xl placeholder:text-[#c4c4c4] placeholder:font-extrabold text-primary text-3xl font-extrabold"
          value={noteTitleVal}
          onChange={(e) => {
            handleTitleVal(e)
          }}
        />
        <Separator className="border-[1px] border-[#323232] mb-2" />
        <div className="mb-10">
          <Textarea
            placeholder="내용 추가..."
            className="placeholder:text-lg text-primary text-lg h-96"
            value={noteContentVal}
            onChange={(e) => {
              handleContentVal(e)
            }}
          />
        </div>

        <Button
          variant="ghost"
          className="w-full bg-mainColor text-black font-extrabold"
          onClick={handleSaveBtn}>
          저장
        </Button>
      </div>
    </div>
  )
}
