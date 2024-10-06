"use client"

import { NavigationHeader } from "@/components/navigation-header"
import { BottomNavigation } from "@/components/bottom-navigation"
import { WriteDiaryBtn } from "./write-diary-btn"
import RenderMydiary from "./components/render-mydiary"
import { useUser } from "@/hooks/use-user"

export default function MydiaryPage() {
  const user = useUser()
  const userId = user?._id
  return (
    <>
      <NavigationHeader isDate userId={userId} />
      <RenderMydiary userId={userId} />
      <WriteDiaryBtn />
      <BottomNavigation />
    </>
  )
}
