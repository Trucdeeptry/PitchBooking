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
                    <label class="block text-sm font-medium text-gray-700 mb-2">Số giờ</label>
                    <div class="relative">
                        <input v-model="formData.time" type="time" min="07:30" max="20:00" step="1800"
                            class="w-full px-3 py-2  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />

                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Số sân</label>
                    <div class="relative">
                        <input v-model="formData.fieldQuantity" disabled type="number" placeholder="Bạn đặt mấy sân"
                            min="1"
                            class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                        <Tablet
                            class="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4  pointer-events-none" />
                    </div>
                </div>
            </div>
            <button @click="emit('sendSearchData', formData)"
                class="bg-green-600 absolute font-bold  -bottom-5 left-1/2 -translate-x-1/2  cursor-pointer hover:bg-green-700 text-white px-8 py-2 rounded-3xl flex items-center transition-colors">
                <SearchIcon class="w-4 h-4 mr-2" />
                Tìm sân
            </button>
        </div>
    </div>
</template>



<script setup>
import { reactive, defineEmits } from 'vue'
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
const emit = defineEmits('sendSearchData')
const now = new Date();

const pad = (n) => String(n).padStart(2, '0')
const formData = reactive({
    date: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`,
    time: '01:00',
    fieldQuantity: '1'
})

</script>

<style scoped>
/* Custom styles if needed */
.backdrop-blur-sm {
    backdrop-filter: blur(4px);
}
</style>
