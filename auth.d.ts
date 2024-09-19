export declare module "@auth/core/types" {
  interface User {
    _id?: string
    name?: string
    email?: string
    image?: string
    loginType?: string
    interest?: string[]
    isOnboarding?: boolean
    tokenExpired?: boolean
    accessToken?: string
    refreshToken?: string
    error?: string
  }

  interface Session {
    user: {
      _id?: string
      name?: string
      email?: string
      image?: string
      loginType?: string
      providerAccountId?: string
      extra?: {
        interest?: string[]
        isOnboarding?: boolean
        tokenExpired?: boolean
      }
    }
    accessToken?: string
    refreshToken?: string
  }
}

export declare module "@auth/core/jwt" {
  interface JWT {
    _id?: string
    loginType?: string
    providerAccountId?: string
    interest?: string[]
    isOnboarding?: boolean
    tokenExpired?: boolean
    accessToken?: string
    refreshToken?: string
  }
}
