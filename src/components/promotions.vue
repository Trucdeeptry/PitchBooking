<template>
    <section id="promotions" class="bg-gradient-to-br from-green-50 to-emerald-100 py-16 px-4">
        <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-12">
                <h2 class="text-4xl font-bold text-green-800 mb-4">
                    Gói khuyến mãi tổ chức giải đấu
                </h2>
                <p class="text-green-600 text-lg max-w-2xl mx-auto">
                    Đăng ký ngay các combo giải đấu để sở hữu ưu đãi
                </p>
            </div>
            <Carousel :value="promotions" :responsiveOptions="responsiveOptions" :showIndicators="true" :numVisible="4" :numScroll="1">

                <template #item="slotProps">
                    <div class="py-10">
                        <div
                            class="flex flex-col w-70  bg-white rounded-2xl shadow-sm hover:shadow-lg  transition-transform  group">
                            <!-- Promotion Image -->
                            <div class="relative rounded-t-2xl h-48 bg-cover bg-center"
                                :style="`background-image: url(${slotProps.data.img})`">
                                <div class="absolute inset-0 bg-black/20 rounded-t-2xl"></div>
                                <div class="absolute top-4 right-4">
                                    <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                        {{ slotProps.data.discount }}
                                    </span>
                                </div>
                                <div class="absolute bottom-4 left-4 text-white">
                                    <component :is="slotProps.data.icon" class="w-10 h-10 mb-1" />
                                    <h3 class="text-lg font-bold leading-tight">
                                        {{ slotProps.data.title }}
                                    </h3>
                                </div>
                            </div>

                            <!-- Promotion Content -->
                            <div class="flex flex-col justify-between flex-grow p-4 ">
                                <!-- Description -->
                                <p class="text-gray-600 text-sm mb-2 line-clamp-3 leading-relaxed">
                                    {{ slotProps.data.description }}
                                </p>

                                <!-- Features -->
                                <ul class="space-y-1 text-sm text-gray-700 mb-4 overflow-y-auto max-h-24 pr-1">
                                    <li v-for="feature in slotProps.data.features" :key="feature"
                                        class="flex items-start">
                                        <CheckIcon class="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                        <span>{{ feature }}</span>
                                    </li>
                                </ul>

                                <!-- Price and CTA -->
                                <div class="flex items-center justify-between mt-auto pt-2">
                                    <div>
                                        <span class="text-xl font-bold text-green-600">
                                            {{ slotProps.data.price / 1000 }}K
                                        </span>
                                        <span class="text-gray-400 line-through ml-2 text-sm">
                                            {{ slotProps.data.originalPrice / 1000 }}K
                                        </span>
                                    </div>
                                    <button @click="bookPromotion(slotProps.data)" type="button"
                                        class="bg-green-600 cursor-pointer hover:bg-green-700 text-white px-4 py-2 rounded-full font-semibold transition-transform duration-300 transform hover:scale-105 text-sm">
                                        Đặt ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </template>
            </Carousel>


        </div>
    </section>

</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon, ClockIcon } from 'lucide-vue-next'
import { Carousel } from 'primevue'
const scrollContainer = ref(null)
const scrollPosition = ref(0)
const maxScroll = ref(0)
const promotions = ref([
    {
        id: 1,
        title: 'Gói Giao Hữu Cuối Tuần',
        description: 'Phù hợp cho các trận đấu giao hữu với bạn bè và gia đình vào cuối tuần.',
        discount: 'Giảm 30%',
        price: 700000,
        originalPrice: 1000000,
        features: ['Thuê sân 2 giờ', 'Miễn phí bóng & áo bib', 'Có phòng thay đồ', 'Bãi đỗ xe miễn phí'],
        validUntil: new Date('2024-12-31'),
        icon: 'div',
        img: 'https://static.vecteezy.com/system/resources/thumbnails/007/746/205/small_2x/soccer-layout-design-football-background-illustration-vector.jpg'
    },
    {
        id: 2,
        title: 'Gói Giải Đấu BO3',
        description: 'Tổ chức giải đấu phong trào thể thức BO3 (tối đa 3 trận).',
        discount: 'Giảm 40%',
        price: 1500000,
        originalPrice: 2500000,
        features: ['Thuê sân nguyên buổi', '3 lượt trận (BO3)', 'Trọng tài chuyên nghiệp', 'Tặng cúp & huy chương'],
        validUntil: new Date('2024-11-30'),
        icon: 'div',
        img: 'https://static.vecteezy.com/system/resources/thumbnails/007/746/205/small_2x/soccer-layout-design-football-background-illustration-vector.jpg'
    },
    {
        id: 3,
        title: 'Gói Giải Đấu BO5',
        description: 'Phù hợp với các giải đấu quy mô nhỏ đến vừa, thể thức BO5.',
        discount: 'Giảm 25%',
        price: 2300000,
        originalPrice: 3100000,
        features: ['5 lượt trận (BO5)', 'Có trọng tài & hỗ trợ kỹ thuật', 'Có bàn ghi điểm', 'Miễn phí nước uống'],
        validUntil: new Date('2024-12-15'),
        icon: 'div',
        img: 'https://static.vecteezy.com/system/resources/thumbnails/007/746/205/small_2x/soccer-layout-design-football-background-illustration-vector.jpg'
    },
    {
        id: 4,
        title: 'Gói Giải Đấu BO7',
        description: 'Tổ chức giải đấu chuyên nghiệp hơn với thể thức BO7.',
        discount: 'Giảm 35%',
        price: 2800000,
        originalPrice: 4300000,
        features: ['7 lượt trận (BO7)', 'Có MC dẫn chương trình', 'Tặng cúp + banner giải', 'Tài trợ nước uống + băng rôn'],
        validUntil: new Date('2024-12-20'),
        icon: 'div',
        img: 'https://static.vecteezy.com/system/resources/thumbnails/007/746/205/small_2x/soccer-layout-design-football-background-illustration-vector.jpg'
    },
    {
        id: 5,
        title: 'Học Viện Bóng Đá Trẻ',
        description: 'Chương trình đào tạo bóng đá dành cho thiếu niên với mức giá ưu đãi.',
        discount: 'Giảm 50%',
        price: 500000,
        originalPrice: 1000000,
        features: ['Khung thành trẻ em', 'Dụng cụ an toàn', 'HLV chuyên môn', 'Theo dõi tiến bộ hàng tuần'],
        validUntil: new Date('2024-12-25'),
        icon: 'div',
        img: 'https://static.vecteezy.com/system/resources/thumbnails/007/746/205/small_2x/soccer-layout-design-football-background-illustration-vector.jpg'
    }
])
const responsiveOptions = ref([
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
]);

</script>
<style >
.p-carousel-next-button {
    color: red;
}
</style>
