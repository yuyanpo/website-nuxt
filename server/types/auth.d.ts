declare module '#auth-utils' {
  interface User {
    id: number
    username: string
    nickname: string
    role: number
    avatar?: string
  }
}

export {}

