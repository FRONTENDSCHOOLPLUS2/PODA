"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { signup } from "@/actions/userAction"
import { useRouter } from "next/navigation"
import { SignupForm } from "@/types/user"
import { useState, useTransition } from "react"
import { FullScreen } from "@/components/spinner"
import { useUserData } from "@/hooks/store/use-user-data"
import { toast } from "sonner"
import { postFormRequest } from "@/lib/protocol"

const SERVER = process.env.NEXT_PUBLIC_API_URL

const FormSchema = z
  .object({
    name: z.string().min(1, {
      message: "이름은 최소 한 자리 이상 입력해주셔야 해요!",
    }),
    email: z
      .string()
      .min(1, {
        message: "이메일은 최소 한 자리 이상 입력해주셔야 해요!",
      })
      .email({ message: "유효하지 않은 이메일 형식이에요!" }),
    password: z.string().min(8, {
      message: "비밀번호는 8자리 이상 입력해주셔야 해요!",
    }),
    passwordCheck: z.string().min(8, {
      message: "비밀번호는 8자리 이상 입력해주셔야 해요!",
    }),
    attach: z.any(),
  })
  .refine((data) => data.password === data.passwordCheck, {
    path: ["passwordCheck"],
    message: "비밀번호가 일치하지 않습니다.",
  })

export default function SignupPage() {
  const router = useRouter()
  const { userData } = useUserData()
  const [isPending, startTransition] = useTransition()

  const [fileInputValue, setFileInputValue] = useState("파일을 선택해주세요!")

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
      attach: undefined,
    },
  })

  const onSubmit = async (formData: SignupForm) => {
    startTransition(async () => {
      if (formData.attach !== undefined && formData.attach?.length > 0) {
        const body = new FormData()
        body.append("attach", formData.attach[0])

        const fileRes = await postFormRequest(`${SERVER}/files`, body)

        if (!fileRes.ok) {
          throw new Error("파일 업로드 실패")
        }

        formData.image = fileRes.item[0].path
      }

      formData.type = "seller"
      formData.extra = {
        age: userData.age,
        gender: userData.gender,
        region: userData.region,
        interest: userData.interest,
        isOnboarding: false,
      }
      delete formData.attach
      delete formData.passwordCheck

      const resData = await signup(formData)

      if (resData.ok) {
        toast.success(`${resData.item.name}님 회원가입을 환영합니다`, {
          style: {
            backgroundColor: "#3e3e3e",
            color: "white",
            border: "none",
          },
        })
        router.push("/login")
      } else {
        if ("errors" in resData) {
          resData.errors.forEach(
            (error: {
              path: "name" | "email" | "password" | "passwordCheck"
              msg: string
            }) => form.setError(error.path, { message: error.msg })
          )
        } else if (resData.message) {
          toast.error(resData.message, {
            style: {
              color: "white",
            },
          })
        }
      }
    })
  }

  return (
    <div className="flex flex-col justify-around px-10 w-full h-full max-w-96 mx-auto py-8 gap-3">
      {isPending && <FullScreen />}
      <div>
        <Image
          src={"/assets/svg/logo-small.svg"}
          alt="Main logo"
          width={172}
          height={83}
          className="mx-auto mb-4"
          priority={true}
        />
        <h1>Signup</h1>
        <p className="mb-3">회원가입 양식에 맞게 입력 해주세요</p>
        <Form {...form}>
          <form
            className="space-y-3 w-full text-primary"
            onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary">Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary">Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary">Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordCheck"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary">Re Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="attach"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary">
                    Profile Image
                  </FormLabel>
                  <FormControl>
                    <div className="flex">
                      <label
                        className={`${
                          form.getValues("attach")?.[0]
                            ? ""
                            : "text-secondary text-center"
                        } h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background truncate`}
                        htmlFor="attach">
                        {form.getValues("attach")?.[0]
                          ? fileInputValue
                          : "파일을 선택해주세요!"}
                      </label>
                      <Input
                        id="attach"
                        accept="image/*"
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files) {
                            form.setValue("attach", e.target.files)
                            setFileInputValue(e.target.files[0]?.name)
                          }
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col pt-6">
              <Button
                type="submit"
                className="bg-mainColor text-black font-bold"
                disabled={isPending}>
                회원가입
              </Button>
              <FormMessage className="text-emotion-angry text-center" />
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
