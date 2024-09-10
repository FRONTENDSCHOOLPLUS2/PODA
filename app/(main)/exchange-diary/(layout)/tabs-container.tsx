"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useExchangeDiaryTab } from "@/hooks/store/use-exchange-diary-tab"
import { useSelectedDiary } from "@/hooks/store/use-selected-diary"
import { TabsContent } from "@radix-ui/react-tabs"
import { ExchangeDiaryTab } from "../exchange-diary-tab"
import { SendDiaryTab } from "../send-diary-tab"
import { DiaryStorageTab } from "../diary-storage-tab"

export default function TabsContainer({ userId }: { userId?: string }) {
  const { selectDiary } = useSelectedDiary()
  const { tabValue, setTabValue } = useExchangeDiaryTab()

  return (
    <Tabs
      defaultValue={tabValue}
      value={tabValue}
      onValueChange={(value: string) =>
        setTabValue(value as "send" | "storage")
      }
      className="w-full h-full">
      <TabsList className="w-full h-[48px] bg-backgroundLighter rounded-none fixed">
        <TabsTrigger className="w-full font-bold py-2.5" value="send">
          <p className="text-[#ffffff]">교환일기</p>
        </TabsTrigger>
        <TabsTrigger className="w-full font-bold py-2.5" value="storage">
          <p className="text-[#ffffff]">보관함</p>
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="send"
        className="flex flex-col justify-center items-center ">
        {!selectDiary ? <ExchangeDiaryTab /> : <SendDiaryTab />}
      </TabsContent>
      <TabsContent
        value="storage"
        className="w-full flex flex-col justify-center items-center px-[24px]">
        <DiaryStorageTab userId={userId} />
      </TabsContent>
    </Tabs>
  )
}
