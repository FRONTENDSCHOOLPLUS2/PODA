import { NavigationHeader } from "@/components/navigation-header"
import RenderLoadDiary from "./render-load-diary"
import { auth } from "@/app/auth"

export default async function LoadDiaryPage() {
  const session = await auth()
  const userId = session?.user?._id

  return (
    <div className="w-full h-full relative ">
      <NavigationHeader isBack isDate />
      <RenderLoadDiary userId={userId} />
    </div>
  )
}

// const datas = data[date]
// <div key={date} className="m-6">
//   <h2 className="text-primary mb-1">{convertTime(date)}</h2>
//   <div className="bg-backgroundLighter rounded-xl">
//     {datas.map((data: DiaryTypes, index: number) => (
//       <ExchangeDiary
//         key={data._id}
//         diaryDatas={data}
//         index={index}
//         totalLength={datas.length}
//       />
//     ))}
//   </div>
// </div>
