"use client"

import { SyncLoader } from "react-spinners"

export function FullScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <SyncLoader color="#3cc42e" />
    </div>
  )
}

export function PartialLoading() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <SyncLoader color="#3cc42e" />
    </div>
  )
}
