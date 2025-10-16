<template>
  <section class="relative h-screen flex items-center justify-center overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920"
        alt="Travel Background"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 text-center text-white px-4 max-w-4xl">
      <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
        探索世界，发现美好
      </h1>
      <p class="text-xl md:text-2xl mb-8 text-gray-200">
        开启您的梦想之旅，体验世界各地的精彩与美丽
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button @click="scrollToDestinations" class="btn-primary text-lg">
          开始探索
        </button>
        <router-link to="/booking" class="btn-outline text-lg bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary-500">
          立即预订
        </router-link>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
const scrollToDestinations = () => {
  const element = document.getElementById('destinations')
  element?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}
</style>
