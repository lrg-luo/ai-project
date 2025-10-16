<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
    <!-- Image -->
    <div class="relative h-64 overflow-hidden">
      <img
        :src="destination.imageUrl"
        :alt="destination.name"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        loading="lazy"
      />
      <div class="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-primary-600">
        ¥{{ destination.price.toLocaleString() }}起
      </div>
      <div v-if="destination.featured" class="absolute top-4 left-4 bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
        推荐
      </div>
    </div>

    <!-- Content -->
    <div class="p-6">
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-xl font-bold text-gray-800">{{ destination.name }}</h3>
        <div class="flex items-center text-yellow-500">
          <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
          </svg>
          <span class="ml-1 text-gray-600 text-sm">{{ destination.rating }} ({{ destination.reviewCount }})</span>
        </div>
      </div>

      <p class="text-gray-600 text-sm mb-4 line-clamp-2">
        {{ destination.shortDescription }}
      </p>

      <div class="flex items-center text-sm text-gray-500 mb-4">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        {{ destination.location }}
        <span class="mx-2">•</span>
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        {{ destination.duration }}天{{ destination.duration - 1 }}晚
      </div>

      <!-- Actions -->
      <div class="flex gap-2">
        <button @click="viewDetails" class="flex-1 px-4 py-2 border-2 border-primary-500 text-primary-500 rounded-lg hover:bg-primary-50 transition-colors">
          查看详情
        </button>
        <button @click="bookNow" class="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
          立即预订
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Destination } from '@/types/destination'

interface Props {
  destination: Destination
}

const props = defineProps<Props>()
const router = useRouter()

const viewDetails = () => {
  // TODO: Navigate to destination detail page
  console.log('View details:', props.destination.name)
}

const bookNow = () => {
  router.push(`/booking/${props.destination.id}`)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
