import { TargetTypes } from "@/hooks/store/use-target"
import { User } from "./user"

export type MoodType = {
  happy: string
  calm: string
  sad: string
  annoy: string
  angry: string
}

type Description = {
  title?: string
  content: string
}

// export type DiaryTypes = {
//   id: number
//   createdAt: string
//   updatedAt: string
//   mood: keyof MoodType
//   tags?: string[]
//   description?: Description
//   uploadImgs?: string[]
//   isHighlighted?: boolean
// }

export type ImageTypes = {
  path: string
  name: string
  originalname: string
}

export type DiaryTypes = {
  _id: number
  createdAt: string
  updatedAt: string
  mainImages?: ImageTypes[]
  type: string
  user: Pick<User, "_id" | "image" | "name">
  extra: {
    title?: string
    content?: string
    mood: keyof MoodType
    tag: string[]
    target: TargetTypes
    attach?: string[]
  }
}

export interface MyDiary {
  id: number
  [key: string]: DiaryTypes[] | number
}
