<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">填写预订信息</h2>

    <!-- Personal Information -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h3 class="text-lg font-semibold mb-4">个人信息</h3>
      <div class="grid md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            姓名 <span class="text-red-500">*</span>
          </label>
          <input
            v-model="formData.fullName"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="请输入您的姓名"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            电话号码 <span class="text-red-500">*</span>
          </label>
          <input
            v-model="formData.phone"
            type="tel"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="请输入您的电话号码"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            电子邮箱 <span class="text-red-500">*</span>
          </label>
          <input
            v-model="formData.email"
            type="email"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="请输入您的邮箱"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            身份证号/护照号 <span class="text-red-500">*</span>
          </label>
          <input
            v-model="formData.idNumber"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="请输入证件号码"
          />
        </div>
      </div>
    </div>

    <!-- Emergency Contact -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h3 class="text-lg font-semibold mb-4">紧急联系人</h3>
      <div class="grid md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">姓名</label>
          <input
            v-model="formData.emergencyName"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="联系人姓名"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">电话</label>
          <input
            v-model="formData.emergencyPhone"
            type="tel"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="联系人电话"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">关系</label>
          <input
            v-model="formData.emergencyRelation"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="与您的关系"
          />
        </div>
      </div>
    </div>

    <!-- Special Requests -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h3 class="text-lg font-semibold mb-4">特殊需求</h3>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">饮食要求</label>
          <input
            v-model="formData.dietary"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="如：素食、清真等"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">房间偏好</label>
          <input
            v-model="formData.roomPreference"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="如：高楼层、安静等"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">其他需求</label>
          <textarea
            v-model="formData.other"
            rows="3"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="请输入其他特殊需求"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-between">
      <button @click="$emit('prev')" class="btn-outline px-8">
        上一步
      </button>
      <button @click="handleNext" class="btn-primary px-8">
        下一步
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const emit = defineEmits<{
  next: []
  prev: []
  update: [data: any]
}>()

const formData = reactive({
  fullName: '',
  phone: '',
  email: '',
  idNumber: '',
  emergencyName: '',
  emergencyPhone: '',
  emergencyRelation: '',
  dietary: '',
  roomPreference: '',
  other: ''
})

const handleNext = () => {
  if (!formData.fullName || !formData.phone || !formData.email || !formData.idNumber) {
    alert('请填写所有必填项')
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.email)) {
    alert('请输入有效的邮箱地址')
    return
  }

  emit('update', {
    personalInfo: {
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      idNumber: formData.idNumber,
      emergencyContact: {
        name: formData.emergencyName,
        phone: formData.emergencyPhone,
        relationship: formData.emergencyRelation
      }
    },
    specialRequests: {
      dietary: formData.dietary,
      roomPreference: formData.roomPreference,
      other: formData.other
    }
  })

  emit('next')
}
</script>
