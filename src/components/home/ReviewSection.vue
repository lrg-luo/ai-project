<template>
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">用户评价</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="review in reviews" :key="review.id" class="bg-white p-6 rounded-lg shadow-lg">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {{ review.userName.charAt(0) }}
            </div>
            <div class="ml-4">
              <div class="font-semibold text-gray-800">{{ review.userName }}</div>
              <div class="flex text-yellow-500">
                <svg v-for="i in review.rating" :key="i" class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
              </div>
            </div>
          </div>
          <p class="text-gray-600 italic">"{{ review.comment }}"</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Review } from '@/types/user'

const reviews = ref<Review[]>([
  {
    id: 1,
    userId: 1,
    userName: '张小姐',
    destinationId: 1,
    rating: 5,
    comment: '马尔代夫的海水真的太美了！酒店服务一流，这次旅行非常完美，强烈推荐！',
    date: new Date('2025-09-15')
  },
  {
    id: 2,
    userId: 2,
    userName: '李先生',
    destinationId: 2,
    rating: 5,
    comment: '巴厘岛的文化体验很棒，寺庙建筑精美，当地人也很友善，会再来的！',
    date: new Date('2025-09-20')
  },
  {
    id: 3,
    userId: 3,
    userName: '王女士',
    destinationId: 3,
    rating: 5,
    comment: '阿尔卑斯山的风景美到令人窒息，徒步路线规划得很好，导游专业热情。',
    date: new Date('2025-10-01')
  }
])
</script>
