"use client"

import { apiKeys } from "@/lib/api-keys"
import { sortDiarys, sortMyDiarys } from "@/lib/function"
import { fetcher } from "@/lib/protocol"
import { ApiResError, ApiResSuccess } from "@/types/api-response"
import { DiaryTypes } from "@/types/my-diarys"
import { useQuery } from "@tanstack/react-query"

export const usePostsDiarys = (type: string, productId?: number) => {
  const searchParams = new URLSearchParams()

  if (productId) {
    searchParams.append("custom", JSON.stringify({ product_id: productId }))
  }

  const { data, isPending, error, refetch } = useQuery<
    Record<string, DiaryTypes[]> | undefined
  >({
    queryKey: [apiKeys.posts, productId],
    queryFn: async () => {
      const res = await fetcher(
        `${apiKeys.posts}?type=${type}&${searchParams.toString()}`
      )
      if (res && res.item.length === 0) {
        return undefined
      }
      return sortDiarys(res.item)
    },
  })

  return {
    data,
    isPending,
    error,
    refetch,
  }
}

export const usePostsMyDiarys = (type: string, userId: number) => {
  const searchParams = new URLSearchParams()
  searchParams.append("custom", JSON.stringify({ "user._id": userId }))
  const { data, isPending, error, refetch } = useQuery<
    Record<string, DiaryTypes[]> | undefined
  >({
    queryKey: [apiKeys.posts, userId],
    queryFn: async () => {
      const res = await fetcher(
        `${apiKeys.posts}?type=${type}&${searchParams.toString()}`
      )
      return sortMyDiarys(res.item)
    },
  })

  return {
    data,
    isPending,
    error,
    refetch,
  }
}

export const usePostsDiary = (id: number) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: [apiKeys.posts, id],
    queryFn: async () => {
      const res = await await fetcher(`/posts/${id}`)
      return res.item
    },
  })

  return {
    data,
    isPending,
    error,
    refetch,
  }
}

export const usePostsExchangeMyDiarys = (type: string, userId: number) => {
  const searchParams = new URLSearchParams()
  searchParams.append("custom", JSON.stringify({ "user._id": userId }))
  const { data, isPending, error, refetch } = useQuery<
    Record<string, DiaryTypes[]> | undefined
  >({
    queryKey: [apiKeys.posts, userId],
    queryFn: async () => {
      const res = await fetcher(
        `${apiKeys.posts}?type=${type}&${searchParams.toString()}`
      )

      if (res && res.item.length === 0) {
        return undefined
      }
      return sortMyDiarys(res.item)
    },
  })

  return {
    data,
    isPending,
    error,
    refetch,
  }
}

// // 특정 달에 해당하는 데이터만 불러오기 (서버단)
// export const usePostDates = (type: string, userId: number) => {
//   const searchParams = new URLSearchParams()
//   searchParams.append("custom", JSON.stringify({ "user._id": userId }))
//   const { data, isPending, error, refetch } = useQuery({
//     queryKey: [apiKeys.posts, userId],
//     queryFn: async () => {
//       const res = await fetcher(
//         `${apiKeys.posts}?type=${type}&${searchParams.toString()}`
//       )
//       return res.item
//     },
//   })

//   const uniqueMonths = data
//     ? data.reduce((acc: any, post: any) => {
//         const month = post.createdAt.substring(0, 7) // "yyyy.MM" 형식으로 변환
//         if (!acc.includes(month)) {
//           acc.push(month) // 중복이 없으면 배열에 추가
//         }
//         return acc
//       }, [])
//     : []

//   return {
//     uniqueMonths,
//     data,
//     isPending,
//     error,
//     refetch,
//   }
// }
