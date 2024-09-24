"use client"
import { NavigationHeader } from "@/components/navigation-header"
import { ChevronLeft, ChevronRight } from "lucide-react"
import React, { ChangeEvent, useEffect, useState } from "react"
import { usePatchPost } from "@/hooks/mutation/post"
import { useParams, useRouter } from "next/navigation"
import { useDiaryValues } from "@/hooks/store/use-diary"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { EmotionItem } from "../../components/emotion-item"
import { Tabs } from "../../components/tabs"
import { TabDatas } from "../../components/tab-datas"
import { DataPreview } from "../../components/data-preview"
import { Note } from "../../components/note"
import { TagData, datas, tabData } from "../../data"

export default function WriteDiaryPage() {
  const { diaryId } = useParams()

  const {
    isEditMode,
    moodVal,
    noteContentVal,
    noteTitleVal,
    selectedTags,
    seter,
    resetValues,
  } = useDiaryValues()
  const { push } = useRouter()
  const [activeTags, setActiveTags] = useState<{ [key: string]: boolean }>({})
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0)
  const currentTabDatas = Object.values(
    datas[tabData[activeTabIndex] as keyof TagData]
  )
  const { mutate: patchMutate } = usePatchPost(Number(diaryId))

  // selectedTag(전역변수)값이 있다면, 상황들 초기값에도 활성화시켜주기
  useEffect(() => {
    const initialActiveTags: { [key: string]: boolean } = {}
    selectedTags?.forEach((tagId) => {
      initialActiveTags[tagId] = true
    })
    setActiveTags(initialActiveTags)
  }, [selectedTags])

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
      setActiveTags((prev) => ({
        ...prev,
        [key]: false,
      }))
    } else {
      if (selectedTags) {
        seter([...selectedTags, currentTag!.key], "selectedTags")
      }
      setActiveTags((prev) => ({
        ...prev,
        [key]: true,
      }))
    }
  }
  // 미리보기 박스에서 태그 클릭 시 해당 태그 제거
  const handlePreviewTagClick = (key: string) => {
    if (selectedTags) {
      seter(
        selectedTags.filter((tag) => tag !== key), // 클릭한 태그를 제거
        "selectedTags"
      )
      setActiveTags((prev) => ({
        ...prev,
        [key]: false, // 비활성화
      }))
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
      patchMutate(requestBody)
      push("/mydiary")
    } catch (error) {
      console.log(error)
    } finally {
      resetValues()
    }
  }

  return (
    <>
      <NavigationHeader isBack isEditMode isMood />
      <div className="text-primary px-6 pt-16">
        <div className="flex justify-between gap-2 my-6">
          <EmotionItem isEditMode={isEditMode} />
        </div>
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
        <div className="flex flex-wrap bg-backgroundLighter w-full rounded-[6px] mb-4 p-6 gap-2">
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

        <Button
          variant="ghost"
          className="w-full bg-mainColor text-black font-extrabold mb-8"
          onClick={handleEdit}>
          수정
        </Button>
      </div>
    </>
  )
}
