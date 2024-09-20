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
import Link from "next/link"
import Image from "next/image"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import {
  signInWithCredentials,
  signInWithGithub,
  signInWithGoogle,
} from "@/actions/authAction"
import { useTransition } from "react"
import { FullScreen } from "@/components/spinner"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "이메일은 최소 한 자리 이상 입력해주셔야 해요!",
    })
    .email({ message: "유효하지 않은 이메일 형식이에요!" }),
  password: z.string().min(8, {
    message: "비밀번호는 최소 8 자리 이상 입력해주셔야 해요!",
  }),
})

export default function LoginPage() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onCredentialSubmit = async (formData: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      const res = await signInWithCredentials(formData)
      if (res.type === "AccessDenied") {
        toast.error("아이디와 비밀번호를 확인해주세요!", {
          style: {
            color: "white",
          },
        })
      } else if (res.kind === "error") {
        toast.error("오류가 발생했습니다!", {
          style: {
            color: "white",
          },
        })
      } else {
        router.push("/api/credentials-login")
      }
    })
  }

  return (
    <>
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
          <h1>Login</h1>
          <p className="mb-3">이메일과 비밀번호를 입력해주세요</p>
          <Form {...form}>
            <form className="space-y-3 w-full text-primary">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-secondary">Email</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
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
              <div className="flex flex-col pt-6">
                <Button
                  type="submit"
                  onClick={form.handleSubmit(onCredentialSubmit)}
                  disabled={isPending}
                  className="bg-mainColor text-black font-bold">
                  로그인
                </Button>
                <p className="mt-3 mb-2">다음 계정으로 로그인</p>
                <div className="flex justify-between gap-4">
                  <Button
                    type="submit"
                    formAction={signInWithGoogle}
                    disabled={isPending}
                    className="justify-between w-full text-black font-bold">
                    <FcGoogle size="20" />
                    구글
                    <span></span>
                  </Button>
                  <Button
                    type="submit"
                    formAction={signInWithGithub}
                    disabled={isPending}
                    className="justify-between w-full bg-backgroundLighter text-primary font-bold">
                    <FaGithub size="20" />
                    깃허브
                    <span></span>
                  </Button>
                </div>
                <Link
                  href={"/signup"}
                  className="text-secondary text-center mt-6">
                  회원가입을 원하시나요?
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}
