<template>
  <div class="relative overflow-hidden rounded-lg">
    <div class="flex transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div v-for="(destination, index) in destinations" :key="index" class="min-w-full">
        <div class="relative h-96 md:h-[500px]">
          <img
            :src="destination.imageUrl"
            :alt="destination.name"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h3 class="text-3xl font-bold mb-2">{{ destination.name }}</h3>
            <p class="text-lg mb-4">{{ destination.shortDescription }}</p>
            <router-link :to="`/booking/${destination.id}`" class="inline-block btn-primary">
              立即预订
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <button
      @click="prev"
      class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
    >
      <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
    </button>
    <button
      @click="next"
      class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
    >
      <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </button>

    <!-- Indicators -->
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
      <button
        v-for="(_, index) in destinations"
        :key="index"
        @click="currentIndex = index"
        :class="[
          'w-3 h-3 rounded-full transition-colors',
          currentIndex === index ? 'bg-white' : 'bg-white/50'
        ]"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { Destination } from '@/types/destination'

interface Props {
  destinations: Destination[]
}

const props = defineProps<Props>()

const currentIndex = ref(0)
let interval: number | undefined

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.destinations.length
}

const prev = () => {
  currentIndex.value = currentIndex.value === 0 ? props.destinations.length - 1 : currentIndex.value - 1
}

onMounted(() => {
  interval = window.setInterval(next, 5000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>
