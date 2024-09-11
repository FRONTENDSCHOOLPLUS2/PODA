import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User2 } from "lucide-react"
import { FaUser, FaUserCircle } from "react-icons/fa"

interface AvatarNameProps {
  image?: string
  name: string
  classname?: string
}

const SERVER = process.env.NEXT_PUBLIC_API_URL

export const AvatarName = ({ image, name, classname }: AvatarNameProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center space-y-0.5 ${classname}`}>
      <Avatar className="w-[48px] h-[48px]">
        {image ? (
          <>
            <AvatarImage
              src={`${image.startsWith("https") ? image : SERVER + image}`}
            />
            <AvatarFallback className="bg-backgroundLighter">
              <FaUser size={24} className="text-secondary" />
            </AvatarFallback>
          </>
        ) : (
          <>
            <AvatarImage
              src={(<FaUser size={24} className="text-secondary" />) as any}
            />
            <AvatarFallback className="bg-backgroundLighter">
              <FaUser size={24} className="text-secondary" />
            </AvatarFallback>
          </>
        )}
      </Avatar>
      <span className="text-xs text-[#c4c4c4] font-semibold">{name}</span>
    </div>
  )
}
