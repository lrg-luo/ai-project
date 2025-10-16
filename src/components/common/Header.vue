<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <span class="text-xl font-bold text-gray-800">探索世界</span>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link to="/" class="text-gray-600 hover:text-primary-500 transition-colors">首页</router-link>
          <a href="#destinations" class="text-gray-600 hover:text-primary-500 transition-colors">目的地</a>
          <router-link to="/about" class="text-gray-600 hover:text-primary-500 transition-colors">关于我们</router-link>
          <a href="#contact" class="text-gray-600 hover:text-primary-500 transition-colors">联系我们</a>
          <router-link to="/booking" class="btn-primary">立即预订</router-link>
        </div>

        <!-- Mobile Menu Button -->
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden text-gray-600">
          <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" class="md:hidden mt-4 pb-4 space-y-4">
        <router-link to="/" class="block text-gray-600 hover:text-primary-500 transition-colors">首页</router-link>
        <a href="#destinations" class="block text-gray-600 hover:text-primary-500 transition-colors">目的地</a>
        <router-link to="/about" class="block text-gray-600 hover:text-primary-500 transition-colors">关于我们</router-link>
        <a href="#contact" class="block text-gray-600 hover:text-primary-500 transition-colors">联系我们</a>
        <router-link to="/booking" class="block btn-primary text-center">立即预订</router-link>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
</script>
