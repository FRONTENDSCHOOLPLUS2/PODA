import { apiKeys } from "@/lib/api-keys"
import { sortDiarys } from "@/lib/function"
import { fetcher } from "@/lib/protocol"
import { ApiResError, ApiResSuccess } from "@/types/api-response"
import { ExchangeDiaryTypes } from "@/types/exchange-diary"
import { DiaryTypes } from "@/types/my-diarys"
import { useQuery } from "@tanstack/react-query"

export const useProductsDiarys = () => {
  const { data, isPending, error, refetch } = useQuery<
    ApiResSuccess<ExchangeDiaryTypes[]>
  >({
    queryKey: [apiKeys.products],
    queryFn: async () => {
      return await fetcher(`${apiKeys.products}`)
    },
    staleTime: 1000 * 3,
  })

  return {
    data,
    isPending,
    error,
    refetch,
  }
}

export const useProductsRepliesDiary = (id: string) => {
  const { data, isPending, error, refetch } = useQuery<
    Record<string, DiaryTypes[]>
  >({
    queryKey: [apiKeys.replies, id],
    queryFn: async () => {
      const res = await fetcher(`${apiKeys.replies}/${id}`)
      return sortDiarys(res.item)
    },
    staleTime: 1000 * 3,
  })

  return {
    data,
    isPending,
    error,
    refetch,
  }
}