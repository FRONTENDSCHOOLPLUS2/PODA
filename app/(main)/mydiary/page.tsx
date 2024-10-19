"use client"

import { NavigationHeader } from "@/components/navigation-header"
import { BottomNavigation } from "@/components/bottom-navigation"
import { WriteDiaryBtn } from "./write-diary-btn"
import RenderMydiary from "./components/render-mydiary"
import { useUser } from "@/hooks/use-user"
import { usePostsMyDiarys } from "@/hooks/query/post"
import { useEffect, useMemo, useRef, useState } from "react"

export default function MydiaryPage() {
  const user = useUser()
  const userId = user?._id
  const { data, isPending, refetch } = usePostsMyDiarys(
    "mydiary",
    Number(userId)
  )

  useEffect(() => {
    refetch()
  }, [userId, refetch])
  const dates = useMemo(() => (data ? Object.keys(data) : []), [data]) // dates : ["2024.10.04","2024.10.02","2024.09.23","2024.09.12"]
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
  }

  useEffect(() => {
    if (selectedDate) {
      const filteredDates = dates.filter((dateKey: string) =>
        dateKey.startsWith(selectedDate)
      ) // 해당 월의 날짜 필터링
      if (filteredDates.length > 0) {
        const recentDate = filteredDates.reduce((latest, current) => {
          return new Date(latest) > new Date(current) ? latest : current // 최근 날짜 찾기
        })

        const element = document.getElementById(recentDate) // 해당 날짜의 ID를 가진 요소 찾기
        if (element) {
          const offset = 80 // 헤더 높이 조정
          const elementPosition =
            element.getBoundingClientRect().top + window.scrollY // 요소의 실제 위치
          const offsetPosition = elementPosition - offset // 오프셋을 적용한 위치

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })
        }
      }
    }
  }, [selectedDate, dates])

  const getUniqueYearMonth = (dates: string[]): string[] => {
    const monthsSet = new Set<string>()
    dates.forEach((dateString) => {
      const [year, month] = dateString.split(".") // "2024.10.04" -> ["2024", "10"]
      monthsSet.add(`${year}.${month}`) // "2024.10" 형식으로 추가
    })

    return Array.from(monthsSet)
  }
  return (
    <>
      <NavigationHeader
        isDate
        dates={getUniqueYearMonth(dates)}
        onDateSelect={handleDateSelect}
      />
      <RenderMydiary isPending={isPending} diaryData={data} />
      <WriteDiaryBtn />
      <BottomNavigation />
    </>
  )
}
