export interface BookingFormData {
  destinationId: number
  startDate: Date
  endDate: Date
  adults: number
  children: number
  packageType: 'standard' | 'deluxe' | 'premium'
  personalInfo: PersonalInfo
  specialRequests?: SpecialRequests
  paymentMethod?: PaymentMethod
}

export interface PersonalInfo {
  fullName: string
  phone: string
  email: string
  idNumber: string
  emergencyContact: EmergencyContact
}

export interface EmergencyContact {
  name: string
  phone: string
  relationship: string
}

export interface SpecialRequests {
  dietary?: string
  roomPreference?: string
  other?: string
}

export type PaymentMethod = 'credit-card' | 'alipay' | 'wechat' | 'paypal'

export interface BookingSummary {
  destination: string
  startDate: Date
  endDate: Date
  guests: number
  packageType: string
  basePrice: number
  tax: number
  discount: number
  totalPrice: number
}

export type BookingStep = 1 | 2 | 3
