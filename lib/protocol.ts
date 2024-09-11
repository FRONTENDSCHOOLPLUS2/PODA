import { auth } from "@/app/auth"

type BaseFetchParamTypes = {
  url: string
  method: string
  data?: string | FormData
  headers?: HeadersInit
}

const baseFetch = async ({
  url,
  method,
  data,
  headers,
  ...option
}: BaseFetchParamTypes) => {
  let authorizationHeader: string | null
  const apiUrl = !url.startsWith("http")
    ? process.env.NEXT_PUBLIC_API_URL + url
    : url

  const accessToken =
    typeof window !== "undefined" && localStorage.getItem("accessToken")

  if (accessToken) {
    authorizationHeader = `Bearer ${accessToken}`
  } else {
    authorizationHeader = null
  }

  const request = {
    body: data,
    ...(authorizationHeader
      ? {
          headers: {
            Authorization: authorizationHeader,
            ...headers,
          },
        }
      : { headers }),
    method,
    ...option,
  }

  try {
    const res = await fetch(apiUrl, request)
    return await res.json()
  } catch (error) {
    if (error instanceof TypeError) {
      console.error("네트워크 에러", error.message)
    } else if (error instanceof Error) {
      console.error(error.message)
    }
  }
}

const fetcher = (url: string) => {
  return baseFetch({
    url,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "client-id": "09-triots",
    },
  })
}

const postRequest = <T>(url: string, arg: T) => {
  return baseFetch({
    url,
    method: "POST",
    data: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
      "client-id": "09-triots",
    },
  })
}

const postFormRequest = (url: string, arg: FormData) => {
  return baseFetch({
    url,
    method: "POST",
    headers: {
      "client-id": "09-triots",
    },
    data: arg,
  })
}

const patchRequest = <T>(url: string, arg: T) => {
  return baseFetch({
    url,
    method: "PATCH",
    data: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
      "client-id": "09-triots",
    },
  })
}

const putRequest = <T>(url: string, arg: T) => {
  return baseFetch({
    url,
    method: "PUT",
    data: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
      "client-id": "09-triots",
    },
  })
}

const deleteRequest = (url: string) => {
  return baseFetch({
    url,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "client-id": "09-triots",
    },
  })
}

export {
  fetcher,
  postRequest,
  postFormRequest,
  patchRequest,
  putRequest,
  deleteRequest,
}
