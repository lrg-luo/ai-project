<template>
  <div>
    <Header />
    
    <!-- Loading State -->
    <div v-if="loading" class="container mx-auto px-4 py-20 text-center">
      <div class="text-gray-600">加载中...</div>
    </div>

    <!-- Not Found State -->
    <div v-else-if="!destination" class="container mx-auto px-4 py-20 text-center">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">目的地未找到</h2>
      <p class="text-gray-600 mb-8">抱歉，我们找不到您要查看的目的地。</p>
      <button 
        @click="router.push('/')"
        class="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
      >
        返回首页
      </button>
    </div>

    <!-- Detail Content -->
    <div v-else>
      <!-- Image Gallery -->
      <section class="relative h-96 md:h-[500px] overflow-hidden bg-gray-900">
        <img
          :src="currentImage"
          :alt="destination.name"
          class="w-full h-full object-cover opacity-90"
        />
        
        <!-- Image Navigation -->
        <div v-if="destination.images.length > 1" class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          <button
            v-for="(_image, index) in destination.images"
            :key="index"
            @click="currentImageIndex = index"
            :class="[
              'w-3 h-3 rounded-full transition-all',
              currentImageIndex === index ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
            ]"
            :aria-label="`查看图片 ${index + 1}`"
          />
        </div>

        <!-- Overlay Info -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div class="container mx-auto px-4 pb-12">
            <div class="flex items-center gap-2 text-white mb-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span class="text-lg">{{ destination.location }}</span>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">{{ destination.name }}</h1>
            <div class="flex items-center gap-4 text-white">
              <div class="flex items-center">
                <svg class="w-6 h-6 fill-current text-yellow-400" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
                <span class="ml-2 text-lg">{{ destination.rating }} ({{ destination.reviewCount }} 评价)</span>
              </div>
              <span class="text-lg">{{ destination.duration }}天{{ destination.duration - 1 }}晚</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Content -->
      <section class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Column - Details -->
          <div class="lg:col-span-2">
            <!-- Description -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 class="text-2xl font-bold text-gray-800 mb-4">目的地介绍</h2>
              <p class="text-gray-700 leading-relaxed">{{ destination.description }}</p>
            </div>

            <!-- Included Items -->
            <div class="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 class="text-2xl font-bold text-gray-800 mb-4">套餐包含</h2>
              <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li
                  v-for="(item, index) in destination.included"
                  :key="index"
                  class="flex items-start gap-2"
                >
                  <svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-gray-700">{{ item }}</span>
                </li>
              </ul>
            </div>

            <!-- Itinerary -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-2xl font-bold text-gray-800 mb-4">行程安排</h2>
              <div class="space-y-6">
                <div
                  v-for="item in destination.itinerary"
                  :key="item.day"
                  class="border-l-4 border-primary-500 pl-6 relative"
                >
                  <div class="absolute -left-2.5 top-0 w-5 h-5 bg-primary-500 rounded-full"></div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-2">
                    第{{ item.day }}天: {{ item.title }}
                  </h3>
                  <p class="text-gray-600 mb-3">{{ item.description }}</p>
                  <ul class="space-y-1">
                    <li
                      v-for="(activity, index) in item.activities"
                      :key="index"
                      class="text-sm text-gray-600 flex items-center gap-2"
                    >
                      <span class="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      {{ activity }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column - Booking Card -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <div class="text-center mb-6">
                <div class="text-gray-600 text-sm mb-1">起价</div>
                <div class="text-4xl font-bold text-primary-600">
                  ¥{{ destination.price.toLocaleString() }}
                </div>
                <div class="text-gray-500 text-sm mt-1">/ 人</div>
              </div>

              <button
                @click="handleBooking"
                class="w-full py-4 bg-primary-500 text-white text-lg font-semibold rounded-lg hover:bg-primary-600 transition-colors mb-4"
              >
                立即预订
              </button>

              <button
                @click="router.push('/')"
                class="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
              >
                返回首页
              </button>

              <!-- Quick Info -->
              <div class="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div class="flex items-center text-sm text-gray-600">
                  <svg class="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {{ destination.duration }}天{{ destination.duration - 1 }}晚
                </div>
                <div class="flex items-center text-sm text-gray-600">
                  <svg class="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  {{ destination.location }}
                </div>
                <div class="flex items-center text-sm text-gray-600">
                  <svg class="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                  </svg>
                  {{ getCategoryName(destination.category) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDestinationsStore } from '@/store/modules/destinations'
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'

const route = useRoute()
const router = useRouter()
const destinationsStore = useDestinationsStore()

const loading = ref(true)
const currentImageIndex = ref(0)

const destination = computed(() => {
  const id = Number(route.params.id)
  return destinationsStore.getDestinationById(id)
})

const currentImage = computed(() => {
  if (!destination.value) return ''
  return destination.value.images[currentImageIndex.value] || destination.value.imageUrl
})

const getCategoryName = (category: string): string => {
  const categoryMap: Record<string, string> = {
    beach: '海滨度假',
    mountain: '山地探险',
    city: '城市观光',
    culture: '文化体验'
  }
  return categoryMap[category] || category
}

const handleBooking = () => {
  if (destination.value) {
    router.push(`/booking/${destination.value.id}`)
  }
}

onMounted(() => {
  // Simulate loading delay
  setTimeout(() => {
    loading.value = false
  }, 300)
})
</script>
