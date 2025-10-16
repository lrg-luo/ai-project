<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">确认并支付</h2>

    <!-- Order Review -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h3 class="text-lg font-semibold mb-4">订单确认</h3>
      <div v-if="summary" class="space-y-3 text-sm">
        <div class="flex justify-between">
          <span class="text-gray-600">目的地</span>
          <span class="font-semibold">{{ summary.destination }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">出行日期</span>
          <span class="font-semibold">{{ formatDate(summary.startDate) }} - {{ formatDate(summary.endDate) }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">游客人数</span>
          <span class="font-semibold">{{ summary.guests }}人</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">套餐类型</span>
          <span class="font-semibold">{{ getPackageLabel(summary.packageType) }}</span>
        </div>
        <div class="border-t pt-3 mt-3 flex justify-between items-center">
          <span class="text-lg font-semibold">总价</span>
          <span class="text-2xl font-bold text-primary-600">¥{{ summary.totalPrice.toLocaleString() }}</span>
        </div>
      </div>
    </div>

    <!-- Payment Method -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h3 class="text-lg font-semibold mb-4">选择支付方式</h3>
      <div class="space-y-3">
        <label v-for="method in paymentMethods" :key="method.value" class="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-primary-500 transition-colors" :class="{ 'border-primary-500 bg-primary-50': paymentMethod === method.value }">
          <input
            v-model="paymentMethod"
            type="radio"
            :value="method.value"
            class="w-5 h-5 text-primary-500"
          />
          <div class="ml-4 flex-1">
            <div class="font-semibold text-gray-800">{{ method.label }}</div>
          </div>
          <div class="text-2xl">{{ method.icon }}</div>
        </label>
      </div>
    </div>

    <!-- Terms and Conditions -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <div class="flex items-start">
        <input
          v-model="agreedToTerms"
          type="checkbox"
          id="terms"
          class="w-5 h-5 text-primary-500 mt-1"
        />
        <label for="terms" class="ml-3 text-sm text-gray-600">
          我已阅读并同意
          <a href="#" class="text-primary-500 hover:underline">服务条款</a>
          和
          <a href="#" class="text-primary-500 hover:underline">取消政策</a>
        </label>
      </div>
    </div>

    <!-- Payment Security Notice -->
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
      <svg class="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
      </svg>
      <div class="text-sm text-blue-800">
        <div class="font-semibold mb-1">安全支付保护</div>
        <div>您的支付信息通过SSL加密传输，确保交易安全可靠。</div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-between">
      <button @click="$emit('prev')" class="btn-outline px-8">
        上一步
      </button>
      <button
        @click="handleSubmit"
        :disabled="!agreedToTerms || !paymentMethod"
        class="btn-primary px-8 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        确认并支付
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { BookingSummary } from '@/types/booking'

interface Props {
  summary: BookingSummary | null
}

defineProps<Props>()

const emit = defineEmits<{
  prev: []
  submit: [paymentMethod: string]
}>()

const paymentMethod = ref('')
const agreedToTerms = ref(false)

const paymentMethods = [
  { value: 'credit-card', label: '信用卡/借记卡', icon: '💳' },
  { value: 'alipay', label: '支付宝', icon: '🟦' },
  { value: 'wechat', label: '微信支付', icon: '🟩' },
  { value: 'paypal', label: 'PayPal', icon: '🅿️' }
]

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
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

const handleSubmit = () => {
  if (!agreedToTerms.value) {
    alert('请同意服务条款和取消政策')
    return
  }
  if (!paymentMethod.value) {
    alert('请选择支付方式')
    return
  }
  emit('submit', paymentMethod.value)
}
</script>
