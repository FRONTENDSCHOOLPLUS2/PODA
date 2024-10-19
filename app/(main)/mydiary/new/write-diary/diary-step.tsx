"use client"

import { NavigationHeader } from "@/components/navigation-header"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import React, { ChangeEvent, useRef, useState } from "react"
import { Tabs } from "../../components/tabs"
import { TabDatas } from "../../components/tab-datas"
import { DataPreview } from "../../components/data-preview"
import { Note } from "../../components/note"
import { useDiaryValues } from "@/hooks/store/use-diary"
import { useRouter } from "next/navigation"
import { TagData, datas, tabData } from "../../data"
import { Button } from "@/components/ui/button"
import { useAddPost } from "@/hooks/mutation/post"
import { FullScreen } from "@/components/spinner"
import { ImCamera } from "react-icons/im"
import { TbFolderFilled } from "react-icons/tb"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { postFormRequest } from "@/lib/protocol"

export const DiaryStep = () => {
  const {
    moodVal,
    noteContentVal,
    noteTitleVal,
    selectedTags,
    activeTags,
    seter,
  } = useDiaryValues()
  const { push } = useRouter()
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0)
  const currentTabDatas = Object.values(
    datas[tabData[activeTabIndex] as keyof TagData]
  )
  const { mutate, isPending } = useAddPost()

  const handleTagClick = (key: string) => {
    const currentTab = tabData[activeTabIndex]
    const currentTag = Object.values(datas[currentTab as keyof TagData]).find(
      (tag) => tag.key === key
    )
    if (!currentTag) return

    // 선택한 태그의 key로 상태 확인
    const isTagSelected = selectedTags?.some((tag) => tag === currentTag?.key)
    if (isTagSelected) {
      seter(
        selectedTags?.filter((tag) => tag !== currentTag?.key),
        "selectedTags"
      )
      seter({ [key]: false }, "activeTags")
    } else {
      if (selectedTags) {
        seter([...selectedTags, currentTag!.key], "selectedTags")
      }
      seter({ [key]: true }, "activeTags")
    }
  }
  // 미리보기 박스에서 태그 클릭 시 해당 태그 비활성화
  const handlePreviewTagClick = (key: string) => {
    if (selectedTags) {
      seter(
        selectedTags.filter((tag) => tag !== key),
        "selectedTags"
      )
      seter({ [key]: false }, "activeTags")
    }
  }
  const handleTabClick = (tab: string) => {
    setActiveTabIndex(tabData.indexOf(tab))
  }
  const handleChevronLeftClick = () => {
    setActiveTabIndex((prevIndex) =>
      prevIndex === 0 ? tabData.length - 1 : prevIndex - 1
    )
  }
  const handleChevronRightClick = () => {
    setActiveTabIndex((prevIndex) =>
      prevIndex === tabData.length - 1 ? 0 : prevIndex + 1
    )
  }
  const handleInpVal = (e: ChangeEvent<HTMLInputElement>) => {
    seter(e.target.value, "noteContentVal")
  }

  const handleSave = async () => {
    // 이미지를 업로드
    if (fileInputValue.length > 0) {
      const body = new FormData()
      fileInputValue.forEach((value) => {
        body.append("attach", value)
      })
      console.log("작성페이지의 body 값 : @@@@@@@@@@@@@@", body.get("attach"))
      // console.log("작성페이지 body 값@@@@@@@@@@@@@ : ", body, fileInputValue)

      const fileRes = await postFormRequest(`${SERVER}/files`, body)

      // console.log("작성페이지 fileRes", fileRes)

      if (!fileRes.ok) {
        throw new Error("파일 업로드 실패입니다.")
      }

      // 이미지 경로를 설정
      const newImagePathList = fileRes.item.map((value: any) => value.path)

      // requestBody를 업로드 후 구성
      const requestBody = {
        type: "mydiary",
        extra: {
          title: noteTitleVal,
          content: noteContentVal,
          mood: moodVal,
          tag: selectedTags ? [...selectedTags] : [],
          attach: newImagePathList, // 즉시 업데이트된 경로 사용
        },
      }

      try {
        mutate(requestBody)
        push("/mydiary")
      } catch (error) {
        console.log(error)
      } finally {
        // resetValues();
      }
    }
  }

  const swipeRef = useRef<HTMLDivElement>(null)
  const startXRef = useRef<number>(0)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startXRef.current = e.touches[0].clientX
  }
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const currentX = e.touches[0].clientX
    const diffX = startXRef.current - currentX

    if (Math.abs(diffX) > swipeRef.current?.clientWidth! * 0.5) {
      if (diffX > 0) {
        handleChevronRightClick()
      } else {
        handleChevronLeftClick()
      }
      startXRef.current = 0
    }
  }

  const SERVER = process.env.NEXT_PUBLIC_API_URL

  const [fileInputValue, setFileInputValue] = useState<File[]>([])

  const handleCameraClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileInputValue((prevFiles) => [...prevFiles, file])
    }
  }

  const handleGalleryClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFileInputValue((prevFiles) => [...prevFiles, ...files])
  }

  const handleRemoveImage = (name: string) => {
    setFileInputValue((prevFiles) =>
      prevFiles.filter((file) => file.name !== name)
    )
  }

  const getImageWidth = () => {
    const count = fileInputValue.length
    if (count === 1) return "w-full h-64"
    if (count === 2 || count === 4) return "w-[calc(50%-4px)] h-36"
    if (count === 3 || count >= 5) return "w-[calc(33%-5px)] h-28"
    return ""
  }

  return (
    <>
      <NavigationHeader isBack isNew isSave />
      <div className="h-full text-primary pt-16 px-6">
        <div className="flex gap-2 mb-4">
          <Image
            src={"/assets/svg/calendar.svg"}
            width={26}
            height={26}
            alt="달력 이미지"
          />
          <h2>무엇을 하고 있었나요?</h2>
        </div>
        {/* 탭*/}
        <div className="flex justify-between bg-backgroundLighter px-2 py-[6px] rounded-full text-[#5b5b5b] mb-[10px]">
          <ChevronLeft
            className="text-primary"
            onClick={handleChevronLeftClick}
          />
          <Tabs
            tabData={tabData}
            handleTabClick={handleTabClick}
            activeTabIndex={activeTabIndex}
          />
          <ChevronRight
            className="text-primary"
            onClick={handleChevronRightClick}
          />
        </div>

        {/* 현재 탭 데이터들 */}
        <div
          ref={swipeRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          className="flex flex-wrap bg-backgroundLighter w-full rounded-[6px] mb-4 p-6 gap-2">
          <TabDatas
            currentTabDatas={currentTabDatas}
            handleTagClick={handleTagClick}
            activeTags={activeTags}
          />
        </div>

        {/* 선택한 상황들 미리보여주는 박스 */}
        <div className="flex flex-wrap bg-backgroundLighter w-full rounded-[6px] mb-4 p-6 gap-2">
          {selectedTags && (
            <DataPreview
              selectedTags={selectedTags}
              handlePreviewTagClick={handlePreviewTagClick}
              datas={datas}
              tabData={tabData}
            />
          )}
        </div>
        {/*노트 */}
        <div className="mb-10">
          <Note
            noteTitleVal={noteTitleVal}
            noteContentVal={noteContentVal}
            handleInpVal={handleInpVal}
          />
        </div>

        {/* 사진 */}
        <div className="mb-6">
          <div className="flex gap-2 mb-2">
            <ImCamera className="text-mainColor w-7 h-7" />
            <h2>사진</h2>
          </div>
          <div className="flex justify-between gap-2">
            <Label
              htmlFor="camera"
              className="flex flex-1 cursor-pointer items-center justify-center bg-[#555555] h-10 px-4 py-2 rounded-md ">
              <ImCamera className="text-mainColor w-5 h-5 mr-2" />
              <Input
                id="camera"
                accept="image/*"
                type="file"
                capture="environment"
                className="bg-[#555555] text-white hidden" // 숨김 처리
                onChange={handleCameraClick}
              />
              사진 촬영
            </Label>

            <Label
              htmlFor="attach"
              className="flex-1 flex bg-[#555555] h-10 px-4 py-2 rounded-md items-center justify-center">
              <TbFolderFilled className="text-mainColor w-6 h-6 mr-2" />
              <Input
                id="attach"
                accept="image/*"
                type="file"
                multiple // 여러 파일 선택 가능
                className="bg-[#555555] hidden" // 숨김처리
                onChange={handleGalleryClick}
              />
              갤러리에서
            </Label>
          </div>
        </div>

        {/* 미리보기 이미지 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {fileInputValue.map((file) => (
            <div
              key={file.name}
              className={cn("relative overflow-hidden", getImageWidth())}>
              <Image
                src={URL.createObjectURL(file)}
                alt={`Preview ${file.name}`}
                width={200}
                height={200}
                className="rounded w-full h-full object-cover object-center"
              />
              <button
                onClick={() => handleRemoveImage(file.name)}
                className="absolute top-2 right-2 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center text-red-800"
                aria-label="Remove image">
                &times;
              </button>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          className="w-full bg-mainColor text-black font-extrabold mb-8"
          onClick={handleSave}
          disabled={isPending}>
          저장
        </Button>
      </div>
    </>
  )
}
