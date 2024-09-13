import { create } from "zustand"

interface IUserData {
  userData: {
    interest: string[] | undefined
  }
  addUserInterest: (value: string) => void
  removeUserInterest: (value: string) => void
  clearUserInterest: () => void
}

export const useUserData = create<IUserData>((set) => ({
  userData: {
    interest: undefined,
  },
  addUserInterest: (value) =>
    set((state) => ({
      userData: {
        ...state.userData,
        interest: state.userData.interest
          ? [...state.userData.interest, value]
          : [value],
      },
    })),
  removeUserInterest: (value) =>
    set((state) => ({
      userData: {
        ...state.userData,
        interest: state.userData.interest
          ? state.userData.interest.filter((el) => el !== value)
          : undefined,
      },
    })),
  clearUserInterest: () =>
    set((state) => ({
      userData: {
        ...state.userData,
        interest: undefined,
      },
    })),
}))
