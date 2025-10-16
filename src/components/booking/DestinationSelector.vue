<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">选择目的地和日期</h2>

    <!-- Destination Info -->
    <div v-if="selectedDestination" class="bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="grid md:grid-cols-2 gap-6 p-6">
        <div>
          <img
            :src="selectedDestination.imageUrl"
            :alt="selectedDestination.name"
            class="w-full h-64 object-cover rounded-lg"
          />
        </div>
        <div>
          <h3 class="text-2xl font-bold mb-2">{{ selectedDestination.name }}</h3>
          <p class="text-gray-600 mb-4">{{ selectedDestination.description }}</p>
          <div class="space-y-2 text-sm text-gray-600">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              </svg>
              {{ selectedDestination.location }}
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {{ selectedDestination.duration }}天{{ selectedDestination.duration - 1 }}晚
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Date Selection -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h3 class="text-lg font-semibold mb-4">选择日期</h3>
      <div class="grid md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">出发日期</label>
          <input
            v-model="startDate"
            type="date"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            :min="minDate"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">返回日期</label>
          <input
            v-model="endDate"
            type="date"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            :min="startDate || minDate"
          />
        </div>
      </div>
    </div>

    <!-- Guests Selection -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h3 class="text-lg font-semibold mb-4">选择人数</h3>
      <div class="grid md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">成人</label>
          <input
            v-model.number="adults"
            type="number"
            min="1"
            max="10"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">儿童</label>
          <input
            v-model.number="children"
            type="number"
            min="0"
            max="10"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>

    <!-- Package Selection -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h3 class="text-lg font-semibold mb-4">选择套餐</h3>
      <div class="space-y-3">
        <label v-for="pkg in packages" :key="pkg.value" class="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-primary-500 transition-colors" :class="{ 'border-primary-500 bg-primary-50': packageType === pkg.value }">
          <input
            v-model="packageType"
            type="radio"
            :value="pkg.value"
            class="w-5 h-5 text-primary-500"
          />
          <div class="ml-4 flex-1">
            <div class="font-semibold text-gray-800">{{ pkg.label }}</div>
            <div class="text-sm text-gray-600">{{ pkg.description }}</div>
          </div>
          <div class="text-lg font-bold text-primary-600">
            {{ pkg.priceMultiplier }}x
          </div>
        </label>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end">
      <button @click="handleNext" class="btn-primary px-8">
        下一步
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Destination } from '@/types/destination'

interface Props {
  destination: Destination | undefined
}

const props = defineProps<Props>()
const emit = defineEmits<{
  next: []
  update: [data: any]
}>()

const selectedDestination = computed(() => props.destination)

const today = new Date()
const minDate = computed(() => today.toISOString().split('T')[0])

const startDate = ref('')
const endDate = ref('')
const adults = ref(2)
const children = ref(0)
const packageType = ref('standard')

const packages = [
  { value: 'standard', label: '标准套餐', description: '基础服务，性价比高', priceMultiplier: '1' },
  { value: 'deluxe', label: '豪华套餐', description: '升级住宿和餐饮', priceMultiplier: '1.5' },
  { value: 'premium', label: '尊享套餐', description: '顶级服务，全程VIP', priceMultiplier: '2' }
]

watch([startDate, endDate, adults, children, packageType], () => {
  emit('update', {
    startDate: startDate.value ? new Date(startDate.value) : undefined,
    endDate: endDate.value ? new Date(endDate.value) : undefined,
    adults: adults.value,
    children: children.value,
    packageType: packageType.value
  })
})

const handleNext = () => {
  if (!startDate.value || !endDate.value) {
    alert('请选择出发和返回日期')
    return
  }
  emit('next')
}
</script>
