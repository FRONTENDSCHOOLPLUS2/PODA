"use client"

import { Button } from "@/components/ui/button"
import { useInterestSheet } from "@/hooks/store/use-interest-sheet"
import { useSelectedDiary } from "@/hooks/store/use-selected-diary"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import Link from "next/link"
import { useAddPost } from "@/hooks/mutation/post"
import { useAddProduct } from "@/hooks/mutation/product"
import { apiKeys } from "@/lib/api-keys"
import { useTarget } from "@/hooks/store/use-target"
import { useSendPush } from "@/hooks/use-send-push"
import { fetcher } from "@/lib/protocol"
import { useUser } from "@/hooks/use-user"

export const SendDiaryTab = () => {
  const { push, replace } = useRouter()
  const { onOpen } = useInterestSheet()
  const { selectDiary, date, product_id } = useSelectedDiary()
  const { isPending } = useAddProduct()
  const { mutate, isPending: isLoading } = useAddPost()
  const { target, sellerId } = useTarget()
  const trigger = useSendPush()
  const send = useSendPush()
  const user = useUser()

  const [isShowDiary, setIsShowDiary] = useState(false)
  const handleOnSubmit = async () => {
    if (!selectDiary) {
      return undefined
    }

    if (!user) {
      return undefined
    }

    if (target && product_id) {
      try {
        await Promise.all(
          selectDiary.map((diary) => {
            return mutate({
              type: "exchange-diary",
              product_id,
              private: true,
              share:
                parseInt(user._id as string) === target._id
                  ? [sellerId]
                  : [target._id],
              extra: {
                title: diary.extra.title,
                content: diary.extra.content,
                mood: diary.extra.mood,
                tag: [...diary.extra.tag],
                target: {
                  _id: target._id,
                  name: target.name,
                  image: target.image,
                },
              },
            })
          })
        )
        if (target._id) {
          const res = await fetcher(`${apiKeys.users}/${target._id}/token`)
          send({
            title: "새로운 일기가 왔어요",
            message: "PODA에 들어와서 확인해보세요",
            link: "https://poda.vercel.app",
            token: res.item.token,
          })
        }
        replace("/exchange-diary/delivery-success")
      } catch (error) {
        console.log(error)
      }
    } else {
      onOpen()
    }
  }

  return (
    <>
      <div className="pt-[80px] w-full">
        <div
          onClick={() => setIsShowDiary(true)}
          className="w-full flex flex-col justify-center items-center space-y-3 ">
          <Image src="/assets/boxs.gif" width={320} height={300} alt="boxs" />
          <div className="space-y-1">
            <h1 className="text-2xl font-black leading-7 text-primary text-center">
              당신의 일기를 전달할
              <br /> 준비가 되었습니다
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full px-[48px] pt-[48px] space-y-3">
        <Button
          onClick={handleOnSubmit}
          disabled={isPending || isLoading}
          className="w-full font-black h-14 rounded-xl bg-mainColor text-black text-lg">
          배송 시작
        </Button>
        <Button
          disabled={isPending || isLoading}
          onClick={() => push("/exchange-diary/load-diary")}
          className="w-full font-black h-14 border-2 border-mainColor rounded-xl bg-transparent text-mainColor text-lg">
          다시 포장
        </Button>
      </div>
      <Button variant="link" className="text-mainColor " disabled={isPending}>
        <Link href={`/exchange-diary/preview/${selectDiary![0]._id}`}>
          포장한 일기 확인하러 가기
        </Link>
      </Button>
    </>
  )
}
