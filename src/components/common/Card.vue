<template>
  <div :class="cardClasses">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  shadow?: boolean
  hover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  padding: 'md',
  shadow: true,
  hover: false
})

const cardClasses = computed(() => {
  const base = 'bg-white rounded-lg'
  
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  
  const shadow = props.shadow ? 'shadow-lg' : ''
  const hover = props.hover ? 'hover:shadow-xl transition-shadow duration-200' : ''
  
  return `${base} ${paddings[props.padding]} ${shadow} ${hover}`
})
</script>
