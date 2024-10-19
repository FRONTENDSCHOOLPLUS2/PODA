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
import { usePostsDiary } from "@/hooks/query/post"
import { postFormRequest } from "@/lib/protocol"
import { cn } from "@/lib/utils"
import { ImCamera } from "react-icons/im"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { TbFolderFilled } from "react-icons/tb"

type FilePreview = {
  name: string
  url: string
  isNew?: boolean
}

export default function WriteDiaryPage() {
  const { diaryId } = useParams()
  const {
    isEditMode,
    seter,
    resetValues,
    moodVal,
    noteTitleVal,
    noteContentVal,
  } = useDiaryValues()
  const { push } = useRouter()
  const [activeTags, setActiveTags] = useState<{ [key: string]: boolean }>({})
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0)
  const currentTabDatas = Object.values(
    datas[tabData[activeTabIndex] as keyof TagData]
  )
  const SERVER = process.env.NEXT_PUBLIC_API_URL
  const { mutate: patchMutate } = usePatchPost(Number(diaryId))
  const { data: fetchedPostData } = usePostsDiary(Number(diaryId))
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [fileInputValue, setFileInputValue] = useState<FilePreview[]>([])
  const [existingImagePaths, setExistingImagePaths] = useState<string[]>([])

  // 일기 데이터가 패칭되면 상태 업데이트
  useEffect(() => {
    if (fetchedPostData) {
      setSelectedTags(fetchedPostData.extra.tag)
      // 기존 이미지 URL을 활용하여 미리보기 이미지 상태 설정
      const initialFiles = fetchedPostData.extra.attach.map((path: string) => ({
        name: path.split("/").pop() || "unknown", // 파일 이름 추출
        url: path, // 이미지 URL
        isNew: false,
      }))
      setExistingImagePaths(initialFiles.map((file: FilePreview) => file.url)) // 기존 이미지 path만 string[]
      setFileInputValue(initialFiles) // 업로드할 파일 미리보기와 관련된 정보
    }
  }, [fetchedPostData])

  const handleRemoveImage = (name: string) => {
    setFileInputValue((prevFiles) => {
      const filteredFiles = prevFiles.filter((file) => file.name !== name)
      console.log("남은 파일들: ", filteredFiles) // 디버깅을 위한 로그
      return filteredFiles // 필터링된 배열 반환
    })

    setExistingImagePaths((prevPaths) => {
      // 삭제할 파일의 경로를 제거
      return prevPaths.filter((path) => path.split("/").pop() !== name)
    })
  }

  const handleCameraClick = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileInputValue((prevFiles) => [
        ...prevFiles,
        { name: file.name, url: URL.createObjectURL(file), isNew: true },
      ])
    }
  }
  const handleGalleryClick = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newFiles = files.map((file) => ({
      file, // 원본 file 객체
      name: file.name,
      url: URL.createObjectURL(file), // blob 데이터를 url로 변환(미리보기 용도)
      isNew: true,
    }))
    setFileInputValue((prevFiles) => [...prevFiles, ...newFiles])
  }

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
      setSelectedTags(selectedTags?.filter((tag) => tag !== currentTag?.key))
      setActiveTags((prev) => ({
        ...prev,
        [key]: false,
      }))
    } else {
      if (selectedTags) {
        setSelectedTags((prev) => [...prev, currentTag!.key])
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
      setSelectedTags(
        selectedTags.filter((tag) => tag !== key) // 클릭한 태그를 제거
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
  const handleEdit = async () => {
    if (fileInputValue.length > 0) {
      const body = new FormData()

      // 기존 이미지 경로를 추가
      existingImagePaths.forEach((path) => {
        body.append("attach", path) // 기존 이미지 경로 추가
      })

      // 새로 업로드할 파일이 있는 경우에만 추가
      fileInputValue.forEach((filePreview: any) => {
        if (filePreview.isNew) {
          // 새 파일일 경우에만 추가
          body.append("attach", filePreview.file) // 원본 File 객체 추가
        }
      })

      const fileRes = await postFormRequest(`${SERVER}/files`, body)

      if (!fileRes.ok) {
        const errorDetail = await fileRes.json()
        console.error("파일 업로드 실패: ", errorDetail)
        throw new Error("파일 업로드 실패입니다.")
      }

      const newImagePathList = fileRes.item.map((value: any) => value.path)

      const requestBody = {
        extra: {
          title: noteTitleVal,
          content: noteContentVal,
          mood: moodVal,
          tag: selectedTags,
          attach: [...existingImagePaths, ...newImagePathList],
        },
      }

      try {
        patchMutate(requestBody)
        push("/mydiary")
        resetValues()
      } catch (error) {
        console.log(error)
      }
    }
  }

  const getImageWidth = () => {
    const count = fileInputValue.length
    if (count === 1) return "w-full h-64"
    if (count === 2 || count === 4) return "w-[calc(50%-4px)] h-36"
    if (count === 3 || count >= 5) return "w-[calc(33%-5px)] h-28"
    return ""
  }
  if (!fetchedPostData || !fetchedPostData.extra) {
    return null
  }

  return (
    <>
      <NavigationHeader isBack isEditMode />
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
                src={file.isNew ? file.url : `${SERVER}/${file.url}`}
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
          onClick={handleEdit}>
          수정
        </Button>
      </div>
    </>
  )
}
