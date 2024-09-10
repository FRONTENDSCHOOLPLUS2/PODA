import { NavigationHeader } from "@/components/navigation-header"
import { BottomNavigation } from "@/components/bottom-navigation"
import { WriteDiaryBtn } from "./write-diary-btn"

import { auth } from "@/app/auth"
import RenderMydiary from "./components/render-mydiary"

export default async function MydiaryPage() {
  const session = await auth()

  const userId = session?.user?._id

  return (
    <>
      <NavigationHeader isDate />
      {/* 날짜(2024-08-03) 개수만큼 반복 */}
      <RenderMydiary userId={userId} />
      <WriteDiaryBtn />
      <BottomNavigation />
    </>
  )
}
