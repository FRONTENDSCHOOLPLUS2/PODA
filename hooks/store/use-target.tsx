import { create } from "zustand"

export type TargetTypes = {
  _id: number
  name: string
  image: string
}

type UseTargetTypes = {
  target?: {
    _id: number
    name: string
    image: string
  }
  sellerId?: number
  setTarget: (value: TargetTypes, id: number) => void
  onReset: () => void
}

export const useTarget = create<UseTargetTypes>((set) => ({
  target: undefined,
  sellerId: undefined,
  setTarget: (value, id) =>
    set({
      sellerId: id,
      target: value,
    }),
  onReset: () =>
    set({
      sellerId: undefined,
      target: undefined,
    }),
}))
