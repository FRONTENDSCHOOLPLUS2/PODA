"use client"

import { DeliveryStatusItem } from "./delivery-status-item"
import { useRouter } from "next/navigation"
import { useProductsDiarys } from "@/hooks/query/products"
import { getKoDate } from "@/lib/function"
import { Spacer } from "@/components/spacer"
import { TargetTypes, useTarget } from "@/hooks/store/use-target"
import { FullScreen } from "@/components/spinner"
import Image from "next/image"

export const DiaryStorageTab = ({ userId }: { userId?: string }) => {
  const { push } = useRouter()

  const { data, isPending } = useProductsDiarys(userId)

  const { setTarget } = useTarget()

  const handleSetTargetWithPush = (
    id: number,
    target: TargetTypes,
    sellerId: number
  ) => {
    setTarget(target, sellerId)
    push(`/exchange-diary/storage/${id}`)
  }

  const renderListItems = data?.item?.map((item) => (
    <div
      className="w-full"
      key={item?._id}
      onClick={() =>
        handleSetTargetWithPush(item._id, item.extra.target, item.seller._id)
      }>
      <DeliveryStatusItem diary={item} />
    </div>
  ))

  return (
    <div className="w-full h-full pt-[76px]">
      <div className="w-full h-full space-y-4">
        {!data && isPending && <FullScreen />}
        {!data && !isPending && (
          <div className="flex flex-col justify-center items-center mt-28">
            <Image
              src="/assets/empty_exchange_diary.png"
              width={160}
              height={160}
              alt=""
            />
            <h2 className="mt-6 text-[#c4c4c4]">보관함이 텅 비었습니다</h2>
          </div>
        )}
        {data && !isPending && renderListItems}
      </div>
      <div className="h-[90px]" />
    </div>
  )
}
