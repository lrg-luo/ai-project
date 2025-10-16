<template>
  <div class="min-h-screen bg-gray-50">
    <Header />

    <div class="container mx-auto px-4 py-8">
      <!-- Breadcrumb -->
      <nav class="mb-8">
        <ol class="flex items-center space-x-2 text-sm text-gray-600">
          <li><router-link to="/" class="hover:text-primary-500">首页</router-link></li>
          <li><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></li>
          <li class="text-gray-900 font-medium">预订</li>
        </ol>
      </nav>

      <!-- Step Indicator -->
      <StepIndicator :currentStep="currentStep" />

      <!-- Main Content -->
      <div class="grid lg:grid-cols-3 gap-8 mt-8">
        <!-- Left Column - Form Steps -->
        <div class="lg:col-span-2">
          <!-- Step 1: Destination Selection -->
          <DestinationSelector
            v-if="currentStep === 1"
            :destination="selectedDestination"
            @next="handleNextStep"
            @update="handleUpdateBooking"
          />

          <!-- Step 2: Booking Form -->
          <BookingForm
            v-if="currentStep === 2"
            @next="handleNextStep"
            @prev="handlePrevStep"
            @update="handleUpdateBooking"
          />

          <!-- Step 3: Payment -->
          <PaymentForm
            v-if="currentStep === 3"
            :summary="bookingSummary"
            @prev="handlePrevStep"
            @submit="handleSubmit"
          />
        </div>

        <!-- Right Column - Order Summary -->
        <div class="lg:col-span-1">
          <OrderSummary :summary="bookingSummary" />
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDestinationsStore } from '@/store/modules/destinations'
import { useBookingStore } from '@/store/modules/booking'
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
import StepIndicator from '@/components/booking/StepIndicator.vue'
import DestinationSelector from '@/components/booking/DestinationSelector.vue'
import BookingForm from '@/components/booking/BookingForm.vue'
import PaymentForm from '@/components/booking/PaymentForm.vue'
import OrderSummary from '@/components/booking/OrderSummary.vue'

const route = useRoute()
const router = useRouter()
const destinationsStore = useDestinationsStore()
const bookingStore = useBookingStore()

const currentStep = computed(() => bookingStore.currentStep)
const bookingSummary = computed(() => bookingStore.bookingSummary)

const selectedDestination = computed(() => {
  const destinationId = bookingStore.bookingData.destinationId
  if (destinationId) {
    return destinationsStore.getDestinationById(destinationId)
  }
  return undefined
})

onMounted(() => {
  // If a destination ID is provided in the route, set it
  const destinationId = route.params.id
  if (destinationId) {
    bookingStore.updateBookingData({
      destinationId: Number(destinationId)
    })
  } else {
    // Default to first destination if none specified
    const firstDestination = destinationsStore.destinations[0]
    if (firstDestination) {
      bookingStore.updateBookingData({
        destinationId: firstDestination.id
      })
    }
  }
})

const handleNextStep = () => {
  bookingStore.nextStep()
}

const handlePrevStep = () => {
  bookingStore.prevStep()
}

const handleUpdateBooking = (data: any) => {
  bookingStore.updateBookingData(data)
}

const handleSubmit = (paymentMethod: string) => {
  console.log('Submitting booking with payment method:', paymentMethod)
  console.log('Booking data:', bookingStore.bookingData)
  
  // Simulate payment processing
  alert('预订成功！感谢您的预订，我们将尽快与您联系确认行程。')
  
  // Reset booking and redirect to home
  bookingStore.resetBooking()
  router.push('/')
}
</script>
