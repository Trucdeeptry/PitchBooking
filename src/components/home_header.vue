<template>
    <section class="relative">
        <header class="fixed w-full z-10">
            <section class="bg-[#f9f9f4] relative">
                <div class="flex items-center space-x-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <img alt="Golfow logo icon, a stylized golf flag icon in dark green"
                        class="w-20 h-20 object-contain" height="24" src="/img/logo.jpeg" width="24" />
                </div>
                <div
                    class="max-w-[1200px] mx-auto flex items-center justify-between px-4 py-3 text-[14px] text-[#1a3a1a]">
                    <nav class="flex items-center space-x-6">
                        <ul class="flex items-center space-x-6">
                            <li v-for="item in navigationItems" :key="item.label" class="relative">
                                <button @click="setActive(item.label)" :class="[
                                    'font-semibold flex items-center space-x-1',
                                    activeHeader === item.label ? 'text-green-700' : 'text-[#1a3a1a]'
                                ]">
                                    <router-link v-if="item.route" :to="item.route" class="no-underline">
                                        {{ item.label }}
                                    </router-link>
                                    <span v-else>{{ item.label }}</span>
                                    <i class="fas fa-caret-down text-[10px]"></i>
                                </button>
                                <span v-if="activeHeader === item.label"
                                    class="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#1a3a1a]"></span>
                            </li>
                        </ul>
                    </nav>

                    <div class="flex items-center space-x-6">
                        <button @click="handleLogin"
                            class="bg-white cursor-pointer border border-[#d1d5db] rounded px-4 py-1 text-[14px] text-[#1a3a1a] hover:bg-[#f3f4f6] transition">
                            Đăng nhập
                        </button>
                        <button @click="handleRegister"
                            class="bg-[#1a3a1a] cursor-pointer text-white rounded px-4 py-1 text-[14px] hover:bg-[#163216] transition">
                            Đăng ký
                        </button>
                    </div>
                </div>
            </section>
        </header>

        <section class="bg-[#f9f9f4] text-center pt-20 py-10 px-4">
            <h1 class="max-w-[600px] mx-auto font-extrabold text-[36px] leading-[44px] uppercase text-green-700">
                Sân bóng đá Tín
                <br />
                <span class="text-2xl text-green-900">Chữ Tín hàng đầu</span>
            </h1>
        </section>

        <div class="absolute border border-[#f9f9f4] -bottom-3 left-1/2 -translate-x-1/2 bg-[#fcd9a3] text-[#1a3a1a] rounded-full px-4 py-1 text-[12px] font-medium flex items-center space-x-2 mt-4"
            style="max-width: 320px;">
            <i class="fas fa-lightbulb"></i>
            <span>Best Football Platform 2025</span>
        </div>
    </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Navigation items with labels and routes
const navigationItems = reactive([
    {
        label: 'Trang chủ',
        route: '/home'
    },
    {
        label: 'Thông báo',
        route: ''
    },
    {
        label: 'Khuyến mãi',
        route: '/home#promotions'
    },
    {
        label: 'Về chúng tôi',
        route: '/about'
    },
    {
        label: 'Thông tin liên hệ',
        route: '/home#contact'
    }
])

// Active header state
const activeHeader = ref('Trang chủ')

// Methods
const setActive = (name) => {
    activeHeader.value = name
}

const handleLogin = () => {
    router.push('/login')
}

const handleRegister = () => {
    router.push('/register')
}

// Set active based on current route (optional)
const setActiveFromRoute = () => {
    const currentRoute = router.currentRoute.value.path
    const activeItem = navigationItems.find(item => item.route === currentRoute)
    if (activeItem) {
        activeHeader.value = activeItem.label
    }
}

// Watch for route changes (optional)
import { watch, onMounted } from 'vue'

onMounted(() => {
    setActiveFromRoute()
})

watch(() => router.currentRoute.value.path, () => {
    setActiveFromRoute()
})
</script>

<style scoped>
.no-underline {
    text-decoration: none;
    color: inherit;
}
</style>
