import { ExchangeDiary } from "./exchange-diary"
import { JWT } from "./jwt"
import { MyDiary } from "./my-diarys"

export interface User {
  _id: number
  email: string
  name: string
  type: string
  loginType: string
  phone: string
  address: string
  createdAt: string
  updatedAt: string
  image: string
  token: JWT
  extra: {
    myDiary: MyDiary
    exchangeDiary: ExchangeDiary[]
    age: string
    gender: string
    interest: string[]
    pushNotification: boolean
    fcmToken: string
  }
}

export interface SignupForm extends Pick<User, "name" | "email"> {
  type?: string
  extra?: {
    age: string | undefined
    gender: string | undefined
    region: string | undefined
    interest: string[] | undefined
    isOnboarding?: boolean
  }
  password: string
  passwordCheck?: string
  attach?: FileList
  image?: string
}
