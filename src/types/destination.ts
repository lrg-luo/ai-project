export interface Destination {
  id: number
  name: string
  description: string
  shortDescription: string
  imageUrl: string
  images: string[]
  price: number
  rating: number
  reviewCount: number
  category: 'beach' | 'mountain' | 'city' | 'culture'
  location: string
  duration: number
  included: string[]
  itinerary: ItineraryItem[]
  featured?: boolean
}

export interface ItineraryItem {
  day: number
  title: string
  description: string
  activities: string[]
}

export interface DestinationFilters {
  search?: string
  category?: string
  priceMin?: number
  priceMax?: number
  startDate?: Date
  guests?: number
}
