<template>
    <div class="relative">
        <!-- Overlay -->
        <div v-if="isOpen" @click="toggleSidebar"
            class="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"></div>

        <!-- Sidebar -->
        <div :class="[
            'fixed top-0 left-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out',
            isOpen ? 'translate-x-0' : '-translate-x-full',
            'w-64'
        ]">
            <!-- Header -->
            <div class="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 class="text-xl font-semibold text-gray-800">Menu</h2>
                <button @click="toggleSidebar" class="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>
            </div>

            <!-- Navigation Items -->
            <nav class="p-4">
                <ul class="space-y-2">
                    <li v-for="item in navItems" :key="item.id">
                        <div v-show="item.isActive">
                            <router-link :to="`/admin/${item.route}`" @click="handleNavClick(item)" :class="[
                                'flex items-center px-4 py-3 rounded-lg transition-colors duration-200',
                                item.active
                                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                                    : 'text-gray-700 hover:bg-gray-100'
                            ]">
                                <component :is="item.icon" class="w-5 h-5 mr-3" />
                                <span class="font-medium">{{ item.title }}</span>
                            </router-link>

                        </div>
                    </li>
                </ul>
            </nav>

            <!-- Footer -->
            <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span class="text-white text-sm font-medium">U</span>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-gray-800">User Name</p>
                        <p class="text-xs text-gray-500">user@example.com</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div :class="['transition-all duration-300', isOpen && 'lg:ml-64']">
            <!-- Toggle Button -->
            <button @click="toggleSidebar"
                class="fixed top-4 left-4 z-30 p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 lg:hidden">
                <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16">
                    </path>
                </svg>
            </button>

            <!-- Desktop Toggle Button -->
            <button @click="toggleSidebar"
                class="hidden lg:block fixed top-4 left-4 z-30 p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <svg v-if="!isOpen" class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16">
                    </path>
                </svg>
                <svg v-else class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                    </path>
                </svg>
            </button>


        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {
    Home,
    User,
    FileText,
    BarChart,
    Settings,
    Mail
} from 'lucide-vue-next'
import router from '../../route'

// Reactive state
const isOpen = ref(false)


const navItems = ref([
    {
        id: 1,
        title: 'Quản lý sân bóng',
        route: 'pitch_management',
        icon: Home,
        isActive: true
    },
    {
        id: 2,
        title: 'Lịch sử đặt sân',
        route: 'bookings',
        icon: User,
        isActive: true
    },
    {
        id: 3,
        title: 'Quản lý khách hàng',
        route: '#',
        icon: FileText,
        isActive: true
    },
    {
        id: 4,
        title: 'Doanh thu',
        route: '#',
        icon: BarChart,
        isActive: true
    },
    {
        id: 5,
        title: 'Quản lý gói khuyến mãi',
        route: '#',
        icon: Settings,
        isActive: true
    },
    {
        id: 6,
        title: 'Cấu hình',
        route: '#',
        icon: Mail,
        isActive: true
    }
])

// Methods
const toggleSidebar = () => {
    isOpen.value = !isOpen.value
}

const handleNavClick = (item) => {
    // Reset all items
    navItems.value.forEach(navItem => {
        navItem.active = false
    })
    // Set clicked item as active
    item.active = true

    // Close sidebar on mobile after clicking
    if (window.innerWidth < 1024) {
        isOpen.value = false
    }
    toggleSidebar()
}

// Handle escape key
const handleEscape = (e) => {
    if (e.key === 'Escape' && isOpen.value) {
        isOpen.value = false
    }
}

// Lifecycle
onMounted(() => {
    document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
/* Custom scrollbar for sidebar */
nav {
    scrollbar-width: thin;
    scrollbar-color: #cbd5e0 #f7fafc;
}

nav::-webkit-scrollbar {
    width: 6px;
}

nav::-webkit-scrollbar-track {
    background: #f7fafc;
}

nav::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 3px;
}

nav::-webkit-scrollbar-thumb:hover {
    background: #a0aec0;
}
</style>