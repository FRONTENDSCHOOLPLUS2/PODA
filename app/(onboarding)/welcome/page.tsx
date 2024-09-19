"use client"

import { Button } from "@/components/ui/button"
import { useInterestSheet } from "@/hooks/store/use-interest-sheet"
import { useCurrentSession } from "@/hooks/use-current-session"
import Image from "next/image"

export default function WelcomePage() {
  const { data } = useCurrentSession()
  const { onOpen } = useInterestSheet()

  return (
    <div className="h-full">
      <Image
        src={"/assets/welcome.png"}
        alt="start page description"
        width={786}
        height={540}
        className="w-full"
      />
      <div className="p-6">
        <h1 className={`mt-2`}>
          환영합니다
          <br />
          {`${data?.user?.name ? data?.user?.name : ""}님! 🎉`}
        </h1>
        <p className="mt-2">
          당신의 이야기를 기록해 보세요
          <br />
          작성한 일기를 다른 사람들과 공유해 보세요!
        </p>
      </div>
      <Button
        type="button"
        className="fixed bottom-6 w-5/6 max-w-96 left-1/2 -translate-x-1/2 bg-mainColor text-black font-bold "
        onClick={() => onOpen()}>
        관심사 선택하기
      </Button>
    </div>
  )
}
