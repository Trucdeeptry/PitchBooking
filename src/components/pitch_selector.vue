<template>
    <div class="min-h-screen bg-gray-50 p-6">
        <div class="max-w-7xl mx-auto">
            <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">Đặt Sân Bóng Đá</h1>
            <search_form @sendSearchData="getSearchData" class="my-10"></search_form>
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <!-- Bộ lọc thời gian - Cột trái -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-lg shadow-md p-6 sticky top-6">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4">Chọn Khung Giờ</h3>
                        <div class="space-y-3">
                            <button v-for="timeSlot in timeSlots" :key="timeSlot.id"
                                @click="selectedTimeSlot = timeSlot.id"
                                :class="selectedTimeSlot === timeSlot.id
                                    ? 'bg-green-500 text-white border-green-500'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-green-50 hover:border-green-300'"
                                class="w-full p-4 rounded-lg border-2 text-left transition-all duration-200 font-medium">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <div class="font-semibold">{{ timeSlot.name }}</div>
                                        <div class="text-sm opacity-75">{{ timeSlot.time }}</div>
                                    </div>
                                    <div v-if="selectedTimeSlot === timeSlot.id" class="text-white">
                                        <CheckIcon class="h-5 w-5" />
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Khu vực chọn sân - Cột phải -->
                <div class="lg:col-span-3">
                    <div v-if="!selectedTimeSlot" class="bg-white rounded-lg shadow-md p-8 text-center">
                        <ClockIcon class="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p class="text-gray-500 text-lg">Vui lòng chọn khung giờ để xem sân trống</p>
                    </div>

                    <div v-else class="space-y-8">
                        <div v-for="pitch in pitches" :key="pitch.id" class="bg-white rounded-lg shadow-md p-6">
                            <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">{{ pitch.name }}</h2>

                            <!-- Layout sân bóng -->
                            <div class="relative">
                                <!-- Sân 7 chính (nền) -->
                                <div class="relative bg-green-100 rounded-lg p-8 border-4 border-green-300">
                                    <div
                                        class="absolute top-2 left-2 bg-white px-2 py-1 rounded text-sm font-medium text-green-700">
                                        Sân 7 người
                                    </div>

                                    <!-- Nút chọn sân 7 -->
                                    <div class="mb-6 flex justify-center">
                                        <button @click="selectMainPitch(pitch)"
                                            :disabled="pitch.booked || pitch.subPitches.some(p => p.booked)" :class="pitch.booked || pitch.subPitches.some(p => p.booked)
                                                ? 'bg-gray-400 cursor-not-allowed text-gray-600'
                                                : selectedPitch === pitch.id
                                                    ? 'bg-orange-500 text-white border-orange-600 shadow-lg'
                                                    : 'bg-green-500 text-white hover:bg-green-600 border-green-600'"
                                            class="px-6 py-3 rounded-lg border-2 font-semibold transition-all duration-200 transform hover:scale-105">
                                            Đặt toàn bộ {{ pitch.name }}
                                        </button>
                                    </div>

                                    <!-- 3 sân 5 con -->
                                    <div class="grid grid-cols-3 gap-4">
                                        <div v-for="sub in pitch.subPitches" :key="sub.id" class="relative">
                                            <button @click="selectSubPitch(pitch, sub)"
                                                :disabled="sub.booked || pitch.booked" :class="sub.booked || pitch.booked
                                                    ? 'bg-gray-300 cursor-not-allowed text-gray-500 border-gray-400'
                                                    : selectedPitch === sub.id
                                                        ? 'bg-orange-400 text-white border-orange-500 shadow-lg'
                                                        : 'bg-white text-green-700 hover:bg-green-50 border-green-400'"
                                                class="w-full h-32 rounded-lg border-2 font-semibold transition-all duration-200 transform hover:scale-105 relative overflow-hidden">
                                                <!-- Nền sân -->
                                                <div class="absolute inset-2 bg-green-200 rounded opacity-50"></div>

                                                <!-- Nội dung -->
                                                <div
                                                    class="relative z-10 flex flex-col items-center justify-center h-full">
                                                    <div class="text-lg font-bold">{{ sub.name }}</div>
                                                    <div class="text-sm">Sân 5 người</div>
                                                    <div v-if="sub.booked"
                                                        class="text-xs mt-1 text-red-600 font-medium">
                                                        Đã đặt
                                                    </div>
                                                </div>

                                                <!-- Đường kẻ sân -->
                                                <div class="absolute inset-2 border border-white rounded opacity-30">
                                                </div>
                                                <div class="absolute top-1/2 left-2 right-2 h-px bg-white opacity-30">
                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Trạng thái sân -->
                                    <div class="mt-4 flex justify-center">
                                        <div v-if="pitch.booked"
                                            class="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                                            Toàn bộ sân đã được đặt
                                        </div>
                                        <div v-else-if="pitch.subPitches.some(p => p.booked)"
                                            class="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                                            Một phần sân đã được đặt
                                        </div>
                                        <div v-else
                                            class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                            Sân trống
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Thông tin đã chọn -->
                        <div v-if="selectedPitch" class="bg-green-50 border border-green-200 rounded-lg p-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-lg font-semibold text-green-800">Thông tin đặt sân</h3>
                                    <p class="text-green-700 mt-1">
                                        <span class="font-medium">Sân:</span> {{ getSelectedPitchName() }}
                                    </p>
                                    <p class="text-green-700">
                                        <span class="font-medium">Thời gian:</span> {{ getSelectedTimeSlotName() }}
                                    </p>
                                </div>
                                <button @click="confirmBooking"
                                    class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                                    Xác nhận đặt sân
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { CheckIcon, ClockIcon } from 'lucide-vue-next'
import search_form from './search_form.vue'
const selectedPitch = ref(null)
const selectedTimeSlot = ref(null)

const timeSlots = ref([
    {
        id: 'morning',
        name: 'Buổi Sáng',
        time: '7:30 - 11:00'
    },
    {
        id: 'afternoon',
        name: 'Buổi Chiều',
        time: '14:00 - 17:00'
    },
    {
        id: 'evening',
        name: 'Buổi Tối',
        time: '17:00 - 20:00'
    }
])

const pitches = ref([
    {
        id: 'pitch1',
        name: 'Sân A',
        booked: false,
        subPitches: [
            { id: 'pitch1-1', name: 'A1', booked: false },
            { id: 'pitch1-2', name: 'A2', booked: true },
            { id: 'pitch1-3', name: 'A3', booked: false }
        ]
    },
    {
        id: 'pitch2',
        name: 'Sân B',
        booked: false,
        subPitches: [
            { id: 'pitch2-1', name: 'B1', booked: false },
            { id: 'pitch2-2', name: 'B2', booked: false },
            { id: 'pitch2-3', name: 'B3', booked: false }
        ]
    }
])

function selectMainPitch(pitch) {
    if (pitch.booked || pitch.subPitches.some(p => p.booked)) return
    selectedPitch.value = pitch.id
}

function selectSubPitch(pitch, sub) {
    if (pitch.booked || sub.booked) return
    selectedPitch.value = sub.id
}

function getSelectedPitchName() {
    if (!selectedPitch.value) return ''

    for (const pitch of pitches.value) {
        if (pitch.id === selectedPitch.value) {
            return `${pitch.name} (Toàn bộ)`
        }

        for (const sub of pitch.subPitches) {
            if (sub.id === selectedPitch.value) {
                return `${pitch.name} - ${sub.name}`
            }
        }
    }
    return ''
}

function getSelectedTimeSlotName() {
    const timeSlot = timeSlots.value.find(t => t.id === selectedTimeSlot.value)
    return timeSlot ? `${timeSlot.name} (${timeSlot.time})` : ''
}

function confirmBooking() {
    alert(`Đặt sân thành công!\nSân: ${getSelectedPitchName()}\nThời gian: ${getSelectedTimeSlotName()}`)
    selectedPitch.value = null
}

const isGettingData = ref(false)
function getSearchData(data) {
    console.log(data);

}
</script>