"use client"

import React, { useState } from "react"
import { Button } from "./ui/button"
import { ChevronLeft, FileEdit, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { useDiaryValues } from "@/hooks/store/use-diary"
import { useAddPost, usePatchPost } from "@/hooks/mutation/post"
import { format, parse } from "date-fns"
import { ko } from "date-fns/locale"
import { createPortal } from "react-dom"
interface NavigationHeaderProps {
  isBack?: boolean
  isSave?: boolean
  isDate?: boolean
  isSearch?: boolean
  isEditMode?: boolean
  isNew?: boolean
  isWriteNote?: boolean
  isEmotionStep?: boolean
  isEditWriteNote?: boolean
  dates?: string[]
  onDateSelect?: (date: string) => void
}

interface ModalProps {
  onClose: () => void
  children: React.ReactNode
}

const Modal = ({ onClose, children }: ModalProps) => {
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }
  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleOutsideClick}>
      <div className="bg-backgroundLighter p-4 rounded shadow-lg w-[80%] h-[40%] relative">
        {children}
      </div>
    </div>,
    document.body
  )
}
export const NavigationHeader = ({
  isBack,
  isSave,
  isDate,
  isSearch,
  isEditMode,
  isNew,
  isWriteNote,
  isEmotionStep,
  isEditWriteNote,
  dates,
  onDateSelect,
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
  const formattedDate = format(new Date(), "yyyy년 M월", { locale: ko })
  const [selectedMonth, setSelectedMonth] = useState(formattedDate)
  const { back, push } = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  // dates : ['2024.10', '2024.09']

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
      push("/mydiary")
      resetValues()
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
  const handleDateClick = (date: string) => {
    setSelectedMonth(convertDate(date))
    setIsModalOpen(false)
    if (onDateSelect) {
      onDateSelect(date)
    }
  }
  const convertDate = (dateString: string) => {
    const date = parse(dateString, "yyyy.MM", new Date())
    const formattedDate = format(date, "yyyy년 M월", { locale: ko })
    return formattedDate
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
          <div className="ml-[24px] w-8 h-8"></div>
        )}

        {moodVal && (
          <Image
            width={32}
            height={32}
            src={`/assets/svg/${moodVal}.svg`}
            alt="선택한 감정상태"
            className="-ml-1"
          />
        )}
      </div>

      <h2
        onClick={() => {
          setIsModalOpen(!isModalOpen)
        }}
        className={cn("text-primary", !isDate && "hidden ")}>
        {selectedMonth}
      </h2>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="mb-10 text-[18px]">달을 선택하세요</h2>

          <div className="flex flex-col items-center gap-3">
            {dates?.map((date) => (
              <p
                key={date}
                onClick={() => {
                  handleDateClick(date)
                }}
                className="text-[18px]">
                {convertDate(date)}
              </p>
            ))}
          </div>
        </Modal>
      )}

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
