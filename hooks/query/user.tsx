"use client"

import { apiKeys } from "@/lib/api-keys"
import { fetcher } from "@/lib/protocol"
import { useQuery } from "@tanstack/react-query"

export const useUserInfo = (id: string) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: [apiKeys.users, id],
    queryFn: async () => {
      return await fetcher(`${apiKeys.users}/${id}`)
    },
    staleTime: 1000 * 3,
  })
  const userInterest = data?.item?.extra?.interest
  const userExtra = data?.item?.extra
  return {
    data,
    userInterest,
    userExtra,
    isPending,
    error,
    refetch,
  }
}
