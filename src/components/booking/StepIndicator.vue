<template>
  <div class="flex items-center justify-center mb-8">
    <div v-for="step in 3" :key="step" class="flex items-center">
      <!-- Step Circle -->
      <div
        :class="[
          'w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-colors',
          currentStep >= step
            ? 'bg-primary-500 text-white'
            : 'bg-gray-200 text-gray-500'
        ]"
      >
        {{ step }}
      </div>
      
      <!-- Step Label -->
      <div class="mx-4 hidden sm:block">
        <div :class="['font-medium', currentStep >= step ? 'text-primary-500' : 'text-gray-500']">
          {{ stepLabels[step - 1] }}
        </div>
      </div>
      
      <!-- Connector Line -->
      <div
        v-if="step < 3"
        :class="[
          'w-16 h-1 mx-2',
          currentStep > step ? 'bg-primary-500' : 'bg-gray-200'
        ]"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  currentStep: number
}

defineProps<Props>()

const stepLabels = ['选择目的地', '填写信息', '确认预订']
</script>
