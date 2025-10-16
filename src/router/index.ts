import BookingPage from '@/views/BookingPage.vue'
import HomePage from '@/views/HomePage.vue'
import DestinationDetailPage from '@/views/DestinationDetailPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/destination/:id',
      name: 'destination-detail',
      component: DestinationDetailPage
    },
    {
      path: '/booking/:id?',
      name: 'booking',
      component: BookingPage
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
