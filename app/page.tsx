"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="h-full">
      <Image
        src={"/assets/start-page-desc.png"}
        alt="start page description"
        width={786}
        height={540}
        className="w-full"
      />
      <div className="p-6">
        <h1 className={`mt-2`}>
          일기를 기록하고
          <br />
          마음을 전하세요
        </h1>
        <p className="mt-2">
          바쁜 현대 사회에 일기 쓰기 귀찮은 당신
          <br />
          간편하게 일기를 기록하고 다양한 사람들과 공유해보세요
        </p>
      </div>
      <Link
        href="/login"
        className="fixed bottom-20 w-5/6 left-1/2 -translate-x-1/2 text-secondary text-center">
        이미 계정이 있으신가요?
      </Link>
      <Button
        type="button"
        className="fixed bottom-6 w-5/6 max-w-96 left-1/2 -translate-x-1/2 bg-mainColor text-black font-bold "
        onClick={() => router.push(`/onboarding`)}>
        시작하기
      </Button>
    </div>
  )
}
