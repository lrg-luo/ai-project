import type { Destination, DestinationFilters } from '@/types/destination'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useDestinationsStore = defineStore('destinations', () => {
  const destinations = ref<Destination[]>([
    {
      id: 1,
      name: '马尔代夫',
      description: '马尔代夫是印度洋上的热带天堂，拥有水晶般清澈的海水、洁白的沙滩和丰富的海洋生物。这里是度假和潜水的理想目的地。',
      shortDescription: '热带天堂，水晶般清澈的海水和洁白沙滩',
      imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
      images: [
        'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200',
        'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200',
        'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200'
      ],
      price: 12999,
      rating: 4.9,
      reviewCount: 328,
      category: 'beach',
      location: '印度洋',
      duration: 7,
      included: ['五星级水上别墅', '往返机票', '每日三餐', '浮潜装备', '水上活动'],
      itinerary: [
        { day: 1, title: '抵达马尔代夫', description: '专车接机，入住水上别墅', activities: ['机场接机', '办理入住', '海滩漫步'] },
        { day: 2, title: '海岛探险', description: '体验浮潜和水上运动', activities: ['浮潜', '海钓', '日落巡航'] }
      ],
      featured: true
    },
    {
      id: 2,
      name: '巴厘岛',
      description: '巴厘岛被誉为"众神之岛"，拥有迷人的海滩、古老的寺庙和独特的文化。这里是放松身心、体验异国文化的完美选择。',
      shortDescription: '众神之岛，迷人海滩与古老寺庙的完美结合',
      imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
      images: [
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200',
        'https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=1200'
      ],
      price: 6999,
      rating: 4.7,
      reviewCount: 256,
      category: 'beach',
      location: '印度尼西亚',
      duration: 6,
      included: ['豪华酒店', '往返机票', '早餐', '文化体验', '接送服务'],
      itinerary: [
        { day: 1, title: '抵达巴厘岛', description: '入住酒店，自由活动', activities: ['机场接机', '酒店入住', '海滩散步'] }
      ],
      featured: true
    },
    {
      id: 3,
      name: '瑞士阿尔卑斯山',
      description: '阿尔卑斯山脉是欧洲最壮观的山脉，四季皆宜。夏季徒步、冬季滑雪，还有迷人的小镇和纯净的自然风光。',
      shortDescription: '欧洲屋脊，壮丽山景与纯净自然的完美融合',
      imageUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800',
      images: [
        'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200'
      ],
      price: 15999,
      rating: 4.8,
      reviewCount: 189,
      category: 'mountain',
      location: '瑞士',
      duration: 8,
      included: ['精品酒店', '往返机票', '早餐', '缆车票', '徒步向导'],
      itinerary: [
        { day: 1, title: '抵达苏黎世', description: '游览苏黎世老城', activities: ['城市观光', '酒店入住'] }
      ]
    },
    {
      id: 4,
      name: '东京',
      description: '东京是传统与现代完美融合的国际大都市，拥有美食、购物、文化和娱乐。从古老寺庙到繁华商业区，体验日本的多样魅力。',
      shortDescription: '传统与现代交融的国际大都市',
      imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
      images: [
        'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200',
        'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200'
      ],
      price: 8999,
      rating: 4.6,
      reviewCount: 412,
      category: 'city',
      location: '日本',
      duration: 5,
      included: ['市区酒店', '往返机票', '地铁卡', '导游服务'],
      itinerary: [
        { day: 1, title: '抵达东京', description: '游览浅草寺和晴空塔', activities: ['浅草寺参观', '晴空塔观光'] }
      ]
    },
    {
      id: 5,
      name: '希腊圣托里尼',
      description: '圣托里尼岛以其蓝白相间的建筑、壮观的日落和浪漫的氛围而闻名。这里是蜜月和浪漫之旅的理想目的地。',
      shortDescription: '爱琴海明珠，蓝白建筑与浪漫日落',
      imageUrl: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
      images: [
        'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200',
        'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200'
      ],
      price: 13999,
      rating: 4.9,
      reviewCount: 298,
      category: 'beach',
      location: '希腊',
      duration: 6,
      included: ['海景酒店', '往返机票', '早餐', '游艇体验', '接送服务'],
      itinerary: [
        { day: 1, title: '抵达圣托里尼', description: '入住悬崖酒店，欣赏日落', activities: ['酒店入住', '伊亚小镇漫步', '日落观赏'] }
      ],
      featured: true
    },
    {
      id: 6,
      name: '京都',
      description: '京都是日本的文化古都，拥有众多古老寺庙、传统庭园和艺伎街区。这里能体验最纯正的日本传统文化。',
      shortDescription: '日本文化古都，千年寺庙与传统庭园',
      imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
      images: [
        'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200',
        'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=1200'
      ],
      price: 7999,
      rating: 4.8,
      reviewCount: 356,
      category: 'culture',
      location: '日本',
      duration: 5,
      included: ['传统旅馆', '往返机票', '早餐', '文化体验', '导游服务'],
      itinerary: [
        { day: 1, title: '抵达京都', description: '游览清水寺和祇园', activities: ['清水寺参观', '祇园漫步', '艺伎表演'] }
      ]
    }
  ])

  const filters = ref<DestinationFilters>({})

  const filteredDestinations = computed(() => {
    let result = [...destinations.value]

    if (filters.value.search) {
      const search = filters.value.search.toLowerCase()
      result = result.filter(d => 
        d.name.toLowerCase().includes(search) || 
        d.description.toLowerCase().includes(search)
      )
    }

    if (filters.value.category) {
      result = result.filter(d => d.category === filters.value.category)
    }

    if (filters.value.priceMin !== undefined) {
      result = result.filter(d => d.price >= filters.value.priceMin!)
    }

    if (filters.value.priceMax !== undefined) {
      result = result.filter(d => d.price <= filters.value.priceMax!)
    }

    return result
  })

  const featuredDestinations = computed(() => 
    destinations.value.filter(d => d.featured)
  )

  const getDestinationById = (id: number) => {
    return destinations.value.find(d => d.id === id)
  }

  const setFilters = (newFilters: DestinationFilters) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const clearFilters = () => {
    filters.value = {}
  }

  return {
    destinations,
    filters,
    filteredDestinations,
    featuredDestinations,
    getDestinationById,
    setFilters,
    clearFilters
  }
})
