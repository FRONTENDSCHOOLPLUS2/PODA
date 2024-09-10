"use client"

import { apiKeys } from "@/lib/api-keys"
import { fetcher } from "@/lib/protocol"
import { ApiResError, ApiResSuccess } from "@/types/api-response"
import { ExchangeDiaryTypes } from "@/types/exchange-diary"
import { useQuery } from "@tanstack/react-query"

export const useProductsDiarys = (userId?: string) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: [apiKeys.products, userId],
    queryFn: async (): Promise<
      ApiResSuccess<ExchangeDiaryTypes[]> | undefined
    > => {
      if (userId) {
        const searchParams = new URLSearchParams([
          [
            "custom",
            JSON.stringify({
              "extra.target._id": userId,
            }),
          ],
        ])
        try {
          if (userId) {
            //타겟이 나인 것
            const targetIdData = await fetcher(
              `${apiKeys.product}?${searchParams.toString()}`
            )
            //내가 만든 것
            const sellerIdData = await fetcher(
              `${apiKeys.product}?seller_id=${userId}`
            )
            //두개를 합쳐서 중복 제거 후 솔팅
            if (targetIdData && sellerIdData) {
              const result = [...targetIdData.item, ...sellerIdData.item]
                .reduce((acc, current) => {
                  if (
                    !acc.some(
                      (item: ExchangeDiaryTypes) => item._id === current._id
                    )
                  ) {
                    acc.push(current)
                  }
                  return acc
                }, [])
                .sort(
                  (a: ExchangeDiaryTypes, b: ExchangeDiaryTypes) =>
                    b._id - a._id
                )

              if (result.length === 0) {
                return undefined
              }

              return {
                ok: 1,
                ...data,
                item: result,
              }
            } else {
              console.log("데이터가 없습니다")
              return undefined
            }
          } else {
            console.log("유저가 없습니다")
            return undefined
          }
        } catch (error) {
          console.log("error", error)
        }
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
