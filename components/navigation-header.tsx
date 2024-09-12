"use client"

import React from "react"
import { Button } from "./ui/button"
import { ChevronLeft, FileEdit, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { useDiaryValues } from "@/hooks/store/use-diary"
import { useAddPost, usePatchPost } from "@/hooks/mutation/post"

interface NavigationHeaderProps {
  isBack?: boolean
  isMood?: boolean
  isSave?: boolean
  isDate?: boolean
  isSearch?: boolean
  isEditMode?: boolean
  isNew?: boolean
  isWriteNote?: boolean
  isEmotionStep?: boolean
  isEditWriteNote?: boolean
}

export const NavigationHeader = ({
  isBack,
  isMood,
  isSave,
  isDate,
  isSearch,
  isEditMode,
  isNew,
  isWriteNote,
  isEmotionStep,
  isEditWriteNote,
}: NavigationHeaderProps) => {
  const {
    moodVal,
    seter,
    noteContentVal,
    noteTitleVal,
    selectedTags,
    resetValues,
  } = useDiaryValues()
  const { diaryId } = useParams()
  const { mutate: addPostMutate } = useAddPost()
  const { mutate: patchPostMutate } = usePatchPost(Number(diaryId))
  const { back, push } = useRouter()

  const handleSave = () => {
    const requestBody = {
      type: "mydiary",
      extra: {
        title: noteTitleVal,
        content: noteContentVal,
        mood: moodVal,
        tag: selectedTags ? [...selectedTags] : [],
      },
    }

    try {
      addPostMutate(requestBody)
    } catch (error) {
      console.log(error)
    } finally {
      push("/mydiary")
      resetValues()
    }
  }

  const handleEdit = () => {
    const requestBody = {
      extra: {
        title: noteTitleVal,
        content: noteContentVal,
        mood: moodVal,
        tag: selectedTags ? [...selectedTags] : [],
      },
    }
    try {
      const res = patchPostMutate(requestBody)
      console.log("res: ", res)
    } catch (error) {
      console.log(error)
    } finally {
      resetValues()
      push("/mydiary")
    }
  }

  const handleBack = () => {
    if (isEditMode) {
      resetValues()
      back()
    } else if (isNew) {
      resetValues()
      push("./write-diary")
    } else if (isWriteNote) {
      seter(2, "step")
      push("./write-diary")
    } else if (isEmotionStep) {
      push("/mydiary")
    } else if (isEditWriteNote) {
      back()
    } else {
      resetValues()
      back()
    }
  }
  return (
    <div className="w-full flex justify-between items-center py-[12px] bg-background z-50 fixed">
      <div className="flex">
        {isBack ? (
          <Button
            variant="ghost"
            onClick={handleBack}
            className="hover:bg-transparent">
            <ChevronLeft className="text-primary" width={32} height={32} />
          </Button>
        ) : (
          <div className="w-8 h-8 invisible"></div>
        )}

        {isMood && (
          <Image
            width={32}
            height={32}
            src={`/assets/svg/${moodVal}.svg`}
            alt="선택한 감정상태"
            className="-ml-1"
          />
        )}
      </div>

      <h2 className={cn("text-primary", !isDate && "hidden ")}>2024년 8월</h2>

      <Button
        variant="ghost"
        disabled={!isSearch}
        className={cn("", !isSearch && "mr-[24px]")}>
        <Search
          className={cn("text-primary", !isSearch && "hidden ")}
          width={24}
          height={24}
        />
      </Button>

      <Button
        variant="ghost"
        disabled={!isSave}
        className={cn("text-primary flex gap-2", !isSave && "hidden")}
        onClick={handleSave}>
        <Image
          width={30}
          height={30}
          src={"/assets/svg/checkBtn.svg"}
          alt="저장버튼"
          className={cn(!isSave && "hidden")}
        />
        저장
      </Button>

      <Button
        variant="ghost"
        disabled={!isEditMode}
        className={cn("text-primary flex gap-2", !isEditMode && "hidden")}
        onClick={handleEdit}>
        <div className="bg-mainColor rounded-full p-[6px]">
          <FileEdit
            width={20}
            height={20}
            className={cn("text-black -mr-[1px]", !isEditMode && "hidden")}
          />
        </div>
        수정
      </Button>
    </div>
  )
}
