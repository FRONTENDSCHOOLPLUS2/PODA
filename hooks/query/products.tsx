"use client"

import { apiKeys } from "@/lib/api-keys"
import { sortDiarys } from "@/lib/function"
import { fetcher } from "@/lib/protocol"
import { ApiResError, ApiResSuccess } from "@/types/api-response"
import { ExchangeDiaryTypes } from "@/types/exchange-diary"
import { DiaryTypes } from "@/types/my-diarys"
import { useQuery } from "@tanstack/react-query"
import { useUser } from "../use-user"
import { useSession } from "next-auth/react"

export const useProductsDiarys = () => {
  const { data: userData } = useSession()

  const { data, isPending, error, refetch } = useQuery<
    ApiResSuccess<ExchangeDiaryTypes[]>
  >({
    queryKey: [apiKeys.products],
    queryFn: async () => {
      const searchParams = new URLSearchParams([
        [
          "custom",
          JSON.stringify({
            "extra.target._id": userData?.user?._id,
          }),
        ],
      ])
      const data = await fetcher(
        `${apiKeys.product}?${searchParams.toString()}`
      )
      const data2 = await fetcher(
        `${apiKeys.product}?seller_id=${userData?.user?._id}`
      )
      console.log("sellerId", data2)
      console.log("product", data)

      const result = [...data.item, ...data2.item].reduce((acc, current) => {
        if (!acc.some((item: any) => item._id === current._id)) {
          acc.push(current)
        }
        return acc
      }, [])

      return {
        ...data,
        item: result,
      }
    },
  })

  return {
    data,
    isPending,
    error,
    refetch,
  }
}
