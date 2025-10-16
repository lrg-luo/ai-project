<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <DestinationCard
      v-for="destination in destinations"
      :key="destination.id"
      :destination="destination"
    />
  </div>

  <div v-if="destinations.length === 0" class="text-center py-12">
    <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <p class="text-gray-500 text-lg">未找到匹配的目的地</p>
  </div>
</template>

<script setup lang="ts">
import type { Destination } from '@/types/destination'
import DestinationCard from './DestinationCard.vue'

interface Props {
  destinations: Destination[]
}

defineProps<Props>()
</script>
