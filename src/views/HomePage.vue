<template>
  <div>
    <Header />
    
    <!-- Hero Section -->
    <HeroSection />

    <!-- Search Section -->
    <section class="container mx-auto px-4 -mt-20 relative z-20">
      <SearchBar />
    </section>

    <!-- Featured Destinations -->
    <section class="container mx-auto px-4 py-16">
      <h2 class="text-3xl font-bold text-center mb-12">精选推荐</h2>
      <FeaturedCarousel :destinations="featuredDestinations" />
    </section>

    <!-- All Destinations -->
    <section id="destinations" class="container mx-auto px-4 py-16 bg-gray-50">
      <h2 class="text-3xl font-bold text-center mb-12">热门目的地</h2>
      <DestinationGrid :destinations="filteredDestinations" />
    </section>

    <!-- Reviews -->
    <ReviewSection />

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDestinationsStore } from '@/store/modules/destinations'
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
import HeroSection from '@/components/home/HeroSection.vue'
import SearchBar from '@/components/home/SearchBar.vue'
import FeaturedCarousel from '@/components/home/FeaturedCarousel.vue'
import DestinationGrid from '@/components/home/DestinationGrid.vue'
import ReviewSection from '@/components/home/ReviewSection.vue'

const destinationsStore = useDestinationsStore()

const filteredDestinations = computed(() => destinationsStore.filteredDestinations)
const featuredDestinations = computed(() => destinationsStore.featuredDestinations)
</script>
