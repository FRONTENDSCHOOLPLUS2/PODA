"use client"

import { useSelectedDiary } from "@/hooks/store/use-selected-diary"
import { useUserData } from "@/hooks/store/use-user-data"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"

export const Tag = ({
  userInterest,
  children,
}: {
  userInterest?: string[]
  children: string
}) => {
  const [selected, setSelected] = useState<boolean>(false)
  const { addUserInterest, removeUserInterest } = useUserData()
  const { removeInterest, setInterest, setMyInterest, myInterest } =
    useSelectedDiary()

  const pathName = usePathname()

  useEffect(() => {
    if (
      pathName === "/mypage" &&
      userInterest &&
      userInterest.includes(children)
    ) {
      setSelected(true)
    } else {
      setSelected(false)
    }
  }, [userInterest, children, pathName])

  const handleSelectTag = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (selected) {
      setSelected(false)
      if (pathName === "/exchange-diary") {
        removeInterest(children)
      }
      if (pathName === "/welcome") {
        removeUserInterest(children)
      }
      if (pathName === "/mypage") {
        const updatedInterest = myInterest.filter((item) => item !== children)
        setMyInterest(updatedInterest)
      }
    } else {
      setSelected(true)
      if (pathName === "/exchange-diary") {
        setInterest(children)
      }
      if (pathName === "/welcome") {
        addUserInterest(children)
      }
      if (pathName === "/mypage") {
        setMyInterest([...myInterest, children])
      }
    }
  }

  return (
    <label
      onClick={(e) => handleSelectTag(e)}
      key={children}
      id={children}
      className={cn(
        "inline-flex justify-center items-center border-2 border-secondary rounded-2xl text-secondary font-black text-sm px-[12px] h-[30px] mb-2.5 ml-2 space-x-1",
        selected && "bg-emotion-happy text-black border-emotion-happy"
      )}>
      {children}
    </label>
  )
}
