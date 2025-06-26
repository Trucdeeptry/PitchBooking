<template>
    <Teleport to="body">
        <div v-if="isLoadingBookings"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <loading_spinner />
        </div>
    </Teleport>
    <div class="min-h-screen bg-gray-50 p-6">
        <div class="max-w-7xl mx-auto">
            <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">Đặt Sân Bóng Đá</h1>
            <search_form class="mb-10" @change_pitch_type="change_pitch_type"></search_form>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Cột 1: Chọn thời gian -->
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-lg shadow-md p-6 sticky top-6">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4">Chọn Thời Gian</h3>

                        <!-- Chọn giờ bắt đầu -->
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Giờ bắt đầu</label>
                            <select v-model="startTime"
                                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="">Chọn giờ bắt đầu</option>
                                <option v-for="hour in availableStartTimes" :key="hour" :value="hour">
                                    {{ hour }}
                                </option>
                            </select>
                        </div>

                        <!-- Chọn giờ kết thúc -->
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Giờ kết thúc</label>
                            <select v-model="endTime" :disabled="!startTime"
                                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100">
                                <option value="">Chọn giờ kết thúc</option>
                                <option v-for="hour in availableEndTimes" :key="hour" :value="hour">
                                    {{ hour }}
                                </option>
                            </select>
                        </div>

                        <!-- Hiển thị thời lượng -->
                        <div v-if="startTime && endTime" class="mb-4 p-3 bg-blue-50 rounded-lg">
                            <div class="text-sm text-blue-700">
                                <strong>Thời lượng:</strong> {{ durationText }}
                            </div>
                            <div class="text-sm text-blue-700">
                                <strong>Thời gian:</strong> {{ startTime }} - {{ endTime }}
                            </div>
                        </div>

                        <!-- Nút reset -->
                        <button @click="resetTimeSelection"
                            class="w-full p-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <RefreshCwIcon class="h-4 w-4 inline mr-2" />
                            Đặt lại thời gian
                        </button>
                    </div>
                </div>

                <!-- Cột 2: Chọn sân -->
                <div class="lg:col-span-1">
                    <div v-if="!startTime || !endTime" class="bg-white rounded-lg shadow-md p-8 text-center">
                        <ClockIcon class="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p class="text-gray-500 text-lg">Vui lòng chọn thời gian để xem sân trống</p>
                    </div>

                    <div v-else class="space-y-6">
                        <!-- Sân 7 người -->
                        <div v-if="selectedType == 7" class="bg-white rounded-lg shadow-md overflow-hidden">
                            <div class="bg-gradient-to-r from-green-600 to-green-700 text-white p-4">
                                <h2 class="text-xl font-bold text-center">Sân 7 Người</h2>
                                <p class="text-center text-green-100 mt-1">2 sân có sẵn</p>
                            </div>

                            <div class="p-4">
                                <div class="grid grid-cols-1 gap-4">
                                    <div v-for="pitch in pitches7" :key="pitch.id"
                                        class="border border-gray-200 rounded-lg p-4">
                                        <div class="flex items-center justify-between mb-3">
                                            <h4 class="font-semibold text-gray-800">{{ pitch.name }}</h4>
                                            <span
                                                :class="isPitchBooked(pitch.bookedSlots) ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'"
                                                class="px-2 py-1 rounded-full text-xs font-medium">
                                                {{ isPitchBooked(pitch.bookedSlots) ? 'Đã đặt' : 'Trống' }}

                                            </span>
                                        </div>


                                        <button @click="selectPitch(pitch)" :disabled="isPitchBooked(pitch.bookedSlots)"
                                            :class="isPitchBooked(pitch.bookedSlots)
                                                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                                                : selectedPitch?.id === pitch.id
                                                    ? 'bg-orange-500 text-white'
                                                    : 'bg-green-500 text-white hover:bg-green-600'"
                                            class="w-full py-2 rounded-lg font-semibold transition-colors">
                                            {{ isPitchBooked(pitch.bookedSlots) ? 'Đã đặt' : selectedPitch?.id ===
                                                pitch.id
                                                ? 'Đã chọn'
                                                : 'Chọn sân' }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Sân 5 người -->
                        <div v-else class="bg-white rounded-lg shadow-md overflow-hidden">
                            <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
                                <h2 class="text-xl font-bold text-center">Sân 5 Người</h2>
                                <p class="text-center text-blue-100 mt-1">3 sân có sẵn</p>
                            </div>

                            <div class="p-4">
                                <div class="grid grid-cols-1 gap-4">
                                    <div v-for="pitch in pitches5" :key="pitch.id"
                                        class="border border-gray-200 rounded-lg p-4">
                                        <div class="flex items-center justify-between mb-3">
                                            <h4 class="font-semibold text-gray-800">{{ pitch.name }}</h4>
                                            <span
                                                :class="isPitchBooked(pitch.bookedSlots) ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'"
                                                class="px-2 py-1 rounded-full text-xs font-medium">
                                                {{ isPitchBooked(pitch.bookedSlots) ? 'Đã đặt' : 'Trống' }}
                                            </span>
                                        </div>
                                        <button @click="selectPitch(pitch)" :disabled="isPitchBooked(pitch.bookedSlots)"
                                            :class="isPitchBooked(pitch.bookedSlots)
                                                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                                                : selectedPitch?.id === pitch.id
                                                    ? 'bg-orange-500 text-white'
                                                    : 'bg-blue-500 text-white hover:bg-blue-600'"
                                            class="w-full py-2 rounded-lg font-semibold transition-colors">
                                            {{ isPitchBooked(pitch.bookedSlots) ? 'Đã đặt' : selectedPitch?.id ===
                                                pitch.id
                                                ? 'Đã chọn'
                                                : 'Chọn sân' }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Cột 3: Chi tiết đặt sân -->
                <form @submit.prevent="confirmBooking" class="lg:col-span-1"
                    v-if="selectedPitch && startTime && endTime">
                    <div class="bg-green-50 border border-green-200 rounded-lg p-6 sticky top-6">
                        <h3 class="text-lg font-semibold text-green-800 mb-4">Chi Tiết Đặt Sân</h3>

                        <!-- Thông tin đặt sân -->
                        <div class="space-y-3 mb-6">
                            <div class="flex justify-between">
                                <span class="text-gray-600">Sân:</span>
                                <span class="font-medium">{{ selectedPitch.name }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Loại sân:</span>
                                <span class="font-medium">{{ selectedPitch.type }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Thời gian:</span>
                                <span class="font-medium">{{ startTime }} - {{ endTime }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Thời lượng:</span>
                                <span class="font-medium">{{ durationText }}</span>
                            </div>
                            <div class="flex justify-between text-lg font-semibold text-green-700">
                                <span>Tổng tiền:</span>
                                <span v-if="totalPrice">{{ totalPrice.toLocaleString() }} VNĐ</span>
                                <loading_spinner v-else></loading_spinner>
                            </div>
                        </div>

                        <!-- Form thông tin người dùng -->
                        <div class="space-y-4 mb-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Họ tên *</label>
                                <input v-model="userInfo.name" required type="text" placeholder="Nhập họ tên"
                                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
                                <input v-model="userInfo.phone" required type="tel" placeholder="Nhập số điện thoại"
                                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input v-model="userInfo.email" type="email" placeholder="Nhập email (tùy chọn)"
                                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
                                <textarea v-model="userInfo.note" placeholder="Ghi chú thêm (tùy chọn)" rows="3"
                                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"></textarea>
                            </div>
                        </div>

                        <!-- Nút xác nhận -->
                        <button :disabled="!userInfo.name || !userInfo.phone" :class="!userInfo.name || !userInfo.phone
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-500 hover:bg-green-600'" type="submit"
                            class="w-full text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                            Xác nhận đặt sân
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>

<script setup>
import loading_spinner from './loading_spinner.vue'
import { ref, computed, reactive, watch, onMounted } from 'vue'
import { ClockIcon, FunnelPlus, RefreshCwIcon } from 'lucide-vue-next'
import search_form from './search_form.vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
const route = useRoute();
const store = useStore()
// Reactive data
const startTime = ref('')
const endTime = ref('')




const selectedPitch = ref(null)
const selectedDate = ref('')
const selectedType = ref()
const bookings = ref(null)

// User information form
const userInfo = reactive({
    name: '',
    phone: '',
    email: '',
    note: ''
})

const timeSlots = []
for (let hour = 7; hour <= 23; hour++) {
    const startMinute = (hour === 7) ? 30 : 0;

    for (let minute = startMinute; minute < 60; minute += 5) {
        const h = String(hour).padStart(2, '0');
        const m = String(minute).padStart(2, '0');
        timeSlots.push(`${h}:${m}`);
    }
}
// Pitch data
const pitches7 = ref([

])

const pitches5 = ref([

])

// Computed properties
const availableStartTimes = computed(() => {
    return timeSlots.slice(0, -1) // Không cho phép bắt đầu ở 23:00
})

const availableEndTimes = computed(() => {
    if (!startTime.value) return []
    const startIndex = timeSlots.findIndex(time => time === startTime.value)
    return timeSlots.slice(startIndex + 6)
})

const duration = computed(() => {
    if (!startTime.value || !endTime.value) return 0

    const [startHour, startMinute] = startTime.value.split(':').map(Number)
    const [endHour, endMinute] = endTime.value.split(':').map(Number)

    const startTotalMinutes = startHour * 60 + startMinute
    const endTotalMinutes = endHour * 60 + endMinute

    const totalMinutes = endTotalMinutes - startTotalMinutes

    return totalMinutes / 60 // đơn vị: giờ
})

const durationText = computed(() => {
    const d = duration.value
    const hours = Math.floor(d)
    const minutes = Math.round((d - hours) * 60)

    let text = ''
    if (hours > 0) text += `${hours} giờ`
    if (minutes > 0) text += ` ${minutes} phút`
    return text.trim() || '0 phút'
})
const totalPrice = ref(0)

watch((selectedPitch), async () => {
    if (!selectedPitch.value || !duration.value) {
        totalPrice.value = 0
        return
    }
    const price = await store.dispatch('booking/getPrice', {
        start_time: startTime.value,
        end_time: endTime.value,
        pitch_type: selectedType.value
    })

    totalPrice.value = price
})

// Methods
function selectPitch(pitch) {
    console.log(pitch);

    if (isPitchBooked(pitch.bookedSlots)) return
    selectedPitch.value = pitch
}

function resetTimeSelection() {
    startTime.value = ''
    endTime.value = ''
    selectedPitch.value = null

}

async function confirmBooking() {
    if (!userInfo.name || !userInfo.phone) {
        alert('Vui lòng nhập đầy đủ họ tên và số điện thoại!')
        return
    }



    const pitch = allPitch.value.find(p =>
        p.sub_pitches.some(s => s.id == selectedPitch.value.id)
    );
    const isExistsPhone = await store.dispatch('profile/isExistsPhone', userInfo.phone)
    let user_id = null
    if (isExistsPhone) {
        // isExistsPhone will return user_id if exists 
        user_id = isExistsPhone
    } else {
        const data = await store.dispatch('profile/createProfiles', {
            full_name: userInfo.name,
            phone,
            email
        })
        user_id = data.phone
    }
    // Viết tới đây thôi có vẻ đúng, mai chạy thử nhé

    const bookingData = {
        pitch_id: pitch.id,
        user_id: user_id,
        start_time: startTime.value,
        end_time: endTime.value,
        total_price: totalPrice.value,
        sub_pitch: selectedType == 5 ? selectedPitch.value.id : null,
        userInfo: { ...userInfo }
    }
    await store.dispatch('booking/createBooking', bookingData)

    // Reset form
    resetTimeSelection()
    Object.assign(userInfo, { name: '', phone: '', email: '', note: '' })
}

// Watchers
watch([startTime, endTime], () => {
    selectedPitch.value = null
})
function getTimeRange(start, end) {
    const slots = []
    const [startHour, startMinute] = start.split(':').map(Number)
    const [endHour, endMinute] = end.split(':').map(Number)
    let totalMinutes = startHour * 60 + startMinute

    const endMinutes = endHour * 60 + endMinute
    while (totalMinutes < endMinutes) {
        const h = String(Math.floor(totalMinutes / 60)).padStart(2, '0')
        const m = String(totalMinutes % 60).padStart(2, '0')
        slots.push(`${h}:${m}`)
        totalMinutes += 5
    }

    return slots
}
function hanldeBookings(bookings) {
    bookings.forEach(b => {

        const range = getTimeRange(b.start_time, b.end_time)
        const index = pitches7.value.findIndex(p => b.pitch_id == p.id)
        if (index != -1) {
            pitches7.value[index].bookedSlots.push(...range)
        } else {
            console.log('ko tim thay pitch 7');
        }
        if (b.sub_pitch_id) {
            const index = pitches5.value.findIndex(p =>
                b.sub_pitch_id == p.id
            )
            if (index != -1) {
                pitches5.value[index].bookedSlots.push(...range)
            } else {
                console.log('ko tim thay pitch 5');
            }
        }
    })
}

const allPitch = ref(null)
async function getAllPitch() {
    allPitch.value = await store.dispatch('pitch/getAllPitch')
    allPitch.value.forEach(({ sub_pitches, ...rest }) => {
        if (sub_pitches.length > 0)
            sub_pitches.forEach(sub => {
                pitches5.value.push({
                    ...sub,
                    bookedSlots: [],
                });
            });
        pitches7.value.push({
            ...rest,
            bookedSlots: [],
        })
    });
}
function isPitchBooked(bookedSlots) {
    const selectedRange = getTimeRange(startTime.value, endTime.value)
    if (bookedSlots.length == 0) {
        return false
    }
    return selectedRange.some(t => bookedSlots.includes(t))
}
function resetBookingState() {
    bookings.value = null
    selectedPitch.value = null
    selectedType.value = null
    pitches7.value.forEach(p => p.bookedSlots = [])
    pitches5.value.forEach(p => p.bookedSlots = [])
}
function change_pitch_type(pitch_type) {
    selectedType.value = pitch_type
}
const isLoadingBookings = ref(false)


onMounted(async () => {
    await getAllPitch()
    watch(() => route.query, async (newRoute) => {
        isLoadingBookings.value = true
        resetBookingState();
        selectedDate.value = newRoute.date
        selectedType.value = newRoute.pitch_type
        if (selectedType.value == 5) {
            bookings.value = await store.dispatch('pitch/getPitch5', newRoute.date)
        }
        else
            bookings.value = await store.dispatch('pitch/getPitch7', newRoute.date)
        if (bookings.value.length > 0)
            hanldeBookings(bookings.value);
        isLoadingBookings.value = false
    }, { deep: true, immediate: true })
}) 
</script>