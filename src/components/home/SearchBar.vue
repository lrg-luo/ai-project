<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <!-- Search Input -->
      <div class="md:col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-2">目的地</label>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索目的地..."
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          @input="handleSearch"
        />
      </div>

      <!-- Category Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">类型</label>
        <select
          v-model="category"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          @change="handleFilter"
        >
          <option value="">全部</option>
          <option value="beach">海滨</option>
          <option value="mountain">山地</option>
          <option value="city">城市</option>
          <option value="culture">文化</option>
        </select>
      </div>

      <!-- Search Button -->
      <div class="flex items-end">
        <button @click="handleFilter" class="w-full btn-primary">
          <svg class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          搜索
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDestinationsStore } from '@/store/modules/destinations'

const destinationsStore = useDestinationsStore()

const searchQuery = ref('')
const category = ref('')

const handleSearch = () => {
  destinationsStore.setFilters({ search: searchQuery.value })
}

const handleFilter = () => {
  destinationsStore.setFilters({
    search: searchQuery.value,
    category: category.value || undefined
  })
}
</script>
