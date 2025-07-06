<template>
    <div class="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-lg border border-green-600 shadow-[0_5px_10px_rgba(0,_128,_0,_0.7)]
">
        <div class="p-6 relative">
            <!-- Form Fields -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Ngày đặt</label>
                    <div class="relative">
                        <input v-model="formData.date" type="date"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                    </div>
                </div>
                <div>
                    <div class="relative w-full max-w-sm">
                        <label for="pitch_type" class="block text-sm font-medium text-gray-700 mb-2">Loại sân</label>
                        <select id="pitch_type" v-model="formData.pitch_type"
                            class="w-full appearance-none bg-white border border-gray-300 text-gray-700 py-2 pl-3 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition">
                            <option value="5">Sân 5 người</option>
                            <option value="7">Sân 7 người</option>
                        </select>

                        <Tablet
                            class="absolute right-3 top-12 transform -translate-y-1/2 h-4 w-4 pointer-events-none" />
                    </div>

                </div>
            </div>
            <button @click="goToBooking()"
                class="bg-green-600 absolute font-bold  -bottom-5 left-1/2 -translate-x-1/2  cursor-pointer hover:bg-green-700 text-white px-8 py-2 rounded-3xl flex items-center transition-colors">
                <SearchIcon class="w-4 h-4 mr-2" />
                Tìm sân
            </button>
        </div>
    </div>
</template>



<script setup>
import { reactive, defineEmits, watch } from 'vue'
import {
    ChevronDownIcon,
    CheckIcon,
    StarIcon,
    CalendarIcon,
    ClockIcon,
    UsersIcon,
    SearchIcon,
    Tablet
} from 'lucide-vue-next'

// Reactive data
const emit = defineEmits(['change_pitch_type'])
const now = new Date();

const pad = (n) => String(n).padStart(2, '0')
const formData = reactive({
    date: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`,
    pitch_type: '5'
})
import { useRouter } from 'vue-router'

const router = useRouter()
const goToBooking = () => {
    const timestamp = Date.now()
    router.push({
        path: '/booking',
        query: {
            ...formData,
            t: timestamp
        },
    })
}
// watch for route change
import { useRoute } from 'vue-router'

const route = useRoute()
watch(() => route.query, (newRoute) => {
    if (newRoute.date) {
        formData.date = newRoute.date
    }
}, { deep: true, immediate: true })
watch(() => formData.pitch_type, (newVal) => {
    emit('change_pitch_type', newVal)
})
</script>

<style scoped>
/* Custom styles if needed */
.backdrop-blur-sm {
    backdrop-filter: blur(4px);
}
</style>
