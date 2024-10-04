import { NavigationHeader } from "@/components/navigation-header"
import { BottomNavigation } from "@/components/bottom-navigation"
import { WriteDiaryBtn } from "./write-diary-btn"

import { auth } from "@/app/auth"
import RenderMydiary from "./components/render-mydiary"
import { useUserStore } from "@/hooks/store/use-user"

export default async function MydiaryPage() {
  const session = await auth()
  const userId = session?.user?._id
  // const date = "2024.08.26 15:33:55"
  // console.log(date.split(".")[0] + " " + date.split(".")[1])

  return (
    <>
      <NavigationHeader isDate userId={userId} />
      <RenderMydiary userId={userId} />
      <WriteDiaryBtn />
      <BottomNavigation />
    </>
  )
}
