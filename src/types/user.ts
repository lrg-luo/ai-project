export interface User {
  id: number
  name: string
  email: string
  phone?: string
  avatar?: string
}

export interface Review {
  id: number
  userId: number
  userName: string
  userAvatar?: string
  destinationId: number
  rating: number
  comment: string
  date: Date
}
