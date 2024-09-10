import { auth } from "@/app/auth"
import TabsContainer from "./tabs-container"

export default async function ExchangeDiaryPage() {
  const session = await auth()
  const userId = session?.user?._id

  return (
    <div className="w-full h-full relative ">
      <TabsContainer userId={userId} />
    </div>
  )
}
