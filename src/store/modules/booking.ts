import type { BookingFormData, BookingStep, BookingSummary } from '@/types/booking'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useDestinationsStore } from './destinations'

export const useBookingStore = defineStore('booking', () => {
  const currentStep = ref<BookingStep>(1)
  const bookingData = ref<Partial<BookingFormData>>({
    adults: 2,
    children: 0,
    packageType: 'standard'
  })

  const destinationsStore = useDestinationsStore()

  const bookingSummary = computed<BookingSummary | null>(() => {
    if (!bookingData.value.destinationId) return null

    const destination = destinationsStore.getDestinationById(bookingData.value.destinationId)
    if (!destination) return null

    const packageMultiplier = {
      standard: 1,
      deluxe: 1.5,
      premium: 2
    }

    const multiplier = packageMultiplier[bookingData.value.packageType || 'standard']
    const guests = (bookingData.value.adults || 0) + (bookingData.value.children || 0)
    const basePrice = destination.price * multiplier * guests
    const tax = basePrice * 0.1
    const discount = 0
    const totalPrice = basePrice + tax - discount

    return {
      destination: destination.name,
      startDate: bookingData.value.startDate!,
      endDate: bookingData.value.endDate!,
      guests,
      packageType: bookingData.value.packageType || 'standard',
      basePrice,
      tax,
      discount,
      totalPrice
    }
  })

  const setStep = (step: BookingStep) => {
    currentStep.value = step
  }

  const nextStep = () => {
    if (currentStep.value < 3) {
      currentStep.value = (currentStep.value + 1) as BookingStep
    }
  }

  const prevStep = () => {
    if (currentStep.value > 1) {
      currentStep.value = (currentStep.value - 1) as BookingStep
    }
  }

  const updateBookingData = (data: Partial<BookingFormData>) => {
    bookingData.value = { ...bookingData.value, ...data }
  }

  const resetBooking = () => {
    currentStep.value = 1
    bookingData.value = {
      adults: 2,
      children: 0,
      packageType: 'standard'
    }
  }

  return {
    currentStep,
    bookingData,
    bookingSummary,
    setStep,
    nextStep,
    prevStep,
    updateBookingData,
    resetBooking
  }
})
