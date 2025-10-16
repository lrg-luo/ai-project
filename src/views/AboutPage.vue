<template>
  <div>
    <Header />
    
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">关于我们</h1>
        <p class="text-xl md:text-2xl opacity-90">探索世界，发现美好</p>
      </div>
    </section>

    <!-- About Content -->
    <section class="container mx-auto px-4 py-16">
      <div class="max-w-4xl mx-auto">
        <!-- Our Story -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold mb-6 text-gray-800">我们的故事</h2>
          <div class="space-y-4 text-gray-600 leading-relaxed">
            <p>
              探索世界旅游网站成立于2025年，我们致力于为每一位旅行爱好者提供最优质的旅游服务和体验。
              我们相信，旅行不仅是一次简单的出行，更是一次心灵的探索和成长的旅程。
            </p>
            <p>
              通过我们精心策划的旅游线路和专业的服务团队，我们已经帮助成千上万的旅行者实现了他们的旅行梦想，
              足迹遍布世界各地的热门目的地。
            </p>
          </div>
        </div>

        <!-- Our Mission -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold mb-6 text-gray-800">我们的使命</h2>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center p-6 bg-primary-50 rounded-lg">
              <div class="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2 text-gray-800">专业服务</h3>
              <p class="text-gray-600">提供专业的旅游规划和贴心的全程服务</p>
            </div>

            <div class="text-center p-6 bg-secondary-50 rounded-lg">
              <div class="w-16 h-16 bg-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2 text-gray-800">品质保证</h3>
              <p class="text-gray-600">严选优质旅游资源，确保每一次旅行体验</p>
            </div>

            <div class="text-center p-6 bg-primary-50 rounded-lg">
              <div class="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2 text-gray-800">用户至上</h3>
              <p class="text-gray-600">始终将用户需求放在首位，用心服务</p>
            </div>
          </div>
        </div>

        <!-- Our Values -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold mb-6 text-gray-800">我们的价值观</h2>
          <div class="space-y-6">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold">1</div>
              <div>
                <h3 class="text-xl font-semibold mb-2 text-gray-800">诚信为本</h3>
                <p class="text-gray-600">以诚信赢得客户信任，建立长期合作关系</p>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold">2</div>
              <div>
                <h3 class="text-xl font-semibold mb-2 text-gray-800">创新求变</h3>
                <p class="text-gray-600">不断创新旅游产品，满足多样化的旅行需求</p>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold">3</div>
              <div>
                <h3 class="text-xl font-semibold mb-2 text-gray-800">追求卓越</h3>
                <p class="text-gray-600">追求卓越品质，为每位旅行者创造美好回忆</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg p-8">
          <h2 class="text-3xl font-bold mb-6 text-center">联系我们</h2>
          <div class="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div class="text-4xl mb-2">📞</div>
              <p class="font-semibold mb-1">电话</p>
              <p class="opacity-90">400-123-4567</p>
            </div>
            <div>
              <div class="text-4xl mb-2">✉️</div>
              <p class="font-semibold mb-1">邮箱</p>
              <p class="opacity-90">contact@explore-world.com</p>
            </div>
            <div>
              <div class="text-4xl mb-2">📍</div>
              <p class="font-semibold mb-1">地址</p>
              <p class="opacity-90">北京市朝阳区旅游大厦</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
</script>
