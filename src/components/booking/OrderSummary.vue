<template>
  <div v-if="summary" class="bg-white rounded-lg shadow-lg p-6 sticky top-24">
    <h3 class="text-xl font-bold text-gray-800 mb-4">预订摘要</h3>

    <!-- Destination -->
    <div class="mb-4">
      <div class="text-sm text-gray-600 mb-1">目的地</div>
      <div class="font-semibold text-gray-800">{{ summary.destination }}</div>
    </div>

    <!-- Dates -->
    <div class="mb-4">
      <div class="text-sm text-gray-600 mb-1">日期</div>
      <div class="font-semibold text-gray-800">
        {{ formatDate(summary.startDate) }} - {{ formatDate(summary.endDate) }}
      </div>
    </div>

    <!-- Guests -->
    <div class="mb-4">
      <div class="text-sm text-gray-600 mb-1">游客人数</div>
      <div class="font-semibold text-gray-800">{{ summary.guests }}人</div>
    </div>

    <!-- Package -->
    <div class="mb-4">
      <div class="text-sm text-gray-600 mb-1">套餐类型</div>
      <div class="font-semibold text-gray-800">{{ getPackageLabel(summary.packageType) }}</div>
    </div>

    <div class="border-t pt-4 mt-4">
      <!-- Price Breakdown -->
      <div class="space-y-2 mb-4">
        <div class="flex justify-between text-sm">
          <span class="text-gray-600">套餐价格</span>
          <span class="text-gray-800">¥{{ summary.basePrice.toLocaleString() }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-600">税费</span>
          <span class="text-gray-800">¥{{ summary.tax.toLocaleString() }}</span>
        </div>
        <div v-if="summary.discount > 0" class="flex justify-between text-sm text-secondary-600">
          <span>优惠</span>
          <span>-¥{{ summary.discount.toLocaleString() }}</span>
        </div>
      </div>

      <!-- Total -->
      <div class="border-t pt-4">
        <div class="flex justify-between items-center">
          <span class="text-lg font-semibold text-gray-800">总价</span>
          <span class="text-2xl font-bold text-primary-600">
            ¥{{ summary.totalPrice.toLocaleString() }}
          </span>
        </div>
      </div>
    </div>

    <!-- Support -->
    <div class="mt-6 pt-6 border-t">
      <div class="text-sm text-gray-600 mb-2">需要帮助？</div>
      <button class="w-full btn-outline text-sm py-2">
        联系客服
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BookingSummary } from '@/types/booking'

interface Props {
  summary: BookingSummary | null
}

defineProps<Props>()

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    month: 'long',
    day: 'numeric'
  })
}

const getPackageLabel = (type: string) => {
  const labels: Record<string, string> = {
    standard: '标准套餐',
    deluxe: '豪华套餐',
    premium: '尊享套餐'
  }
  return labels[type] || type
}
</script>
