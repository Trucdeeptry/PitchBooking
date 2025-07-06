<template>
    <section class="news-section py-16 bg-gradient-to-br from-slate-50 to-white">
        <div class="container mx-auto px-6">
            <!-- Section Header -->
            <div class="text-center mb-12">
                <h2 class="text-4xl font-bold text-gray-900 mb-4">Tin tức đá bóng mới nhất</h2>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                    Cập nhật tin tức bóng đá nóng hổi mỗi ngày
                </p>
            </div>

            <!-- News Carousel -->
            <div class="max-w-7xl mx-auto">
                <Carousel :value="newsArticles" :numVisible="3" :numScroll="1" :responsiveOptions="responsiveOptions"
                    :showIndicators="true" :showNavigators="true" class="custom-carousel">
                    <template #item="{ data }">
                        <div class="news-card mx-3 py-5">
                            <div class="bg-white rounded-2xl shadow-sm hover:shadow-lg overflow-hidden group">
                                <!-- Image Container -->
                                <div class="relative overflow-hidden">
                                    <img :src="data.image" :alt="data.title"
                                        class="w-full h-48 object-cover group-hover:scale-105 transition-transform" />
                                    <div class="absolute top-4 left-4">
                                        <span
                                            class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            {{ data.category }}
                                        </span>
                                    </div>
                                    <div class="absolute bottom-4 right-4">
                                        <span class="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                                            {{ formatDate(data.date) }}
                                        </span>
                                    </div>
                                </div>

                                <!-- Content -->
                                <div class="p-6">
                                    <h3
                                        class="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
                                        {{ data.title }}
                                    </h3>
                                    <p class="text-gray-600 mb-4 line-clamp-3">
                                        {{ data.excerpt }}
                                    </p>

                                    <!-- Author & Read More -->
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center space-x-3">
                                            <img :src="data.author.avatar" :alt="data.author.name"
                                                class="w-8 h-8 rounded-full object-cover" />
                                            <span class="text-sm text-gray-500">{{ data.author.name }}</span>
                                        </div>
                                        <button
                                            class="text-green-600 hover:text-green-700 font-medium text-sm flex items-center space-x-1 group">
                                            <span>Tìm hiểu thêm</span>
                                            <ChevronRightIcon
                                                class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </Carousel>
            </div>

            <!-- View All News Button -->
            <div class="text-center mt-12">
                <button
                    class="bg-green-600 cursor-pointer hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                    Xem tất cả tin tức
                </button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Carousel from 'primevue/carousel'
import { ChevronRightIcon } from 'lucide-vue-next'

const newsArticles = ref([
    {
        id: 1,
        title: "Mùa giải phủi mới khởi tranh sôi động tại TP.HCM",
        excerpt: "Các sân bóng mini trên địa bàn TP.HCM đang sôi động hơn bao giờ hết với loạt trận mở màn của giải phủi phong trào. Các đội bóng phong trào thể hiện tinh thần thi đấu máu lửa và gắn kết.",
        image: "https://scov.gov.vn/upload/2005660/20230815/grab2f1a1ttxvn_giai_bong_da_hong_kong_2.jpg",
        category: "Giải phủi",
        date: new Date('2024-01-15'),
        author: {
            name: "Nguyễn Minh",
            avatar: "https://www.dreamwave.ai/_next/image?url=%2Fimages%2Ftestimonial2%2Fmaddie%2Fmaddie-input.jpeg&w=256&q=75"
        }
    },
    {
        id: 2,
        title: "Giải giao hữu cuối tuần thu hút đông đảo đội bóng",
        excerpt: "Hàng chục đội bóng đăng ký tham gia các giải giao hữu cuối tuần tại các cụm sân lớn ở quận 7 và Thủ Đức. Không khí thi đấu rất sôi nổi và công tác tổ chức chuyên nghiệp.",
        image: "https://scov.gov.vn/upload/2005660/20230815/grab2f1a1ttxvn_giai_bong_da_hong_kong_2.jpg",
        category: "Giao hữu",
        date: new Date('2024-01-14'),
        author: {
            name: "Trần Huy",
            avatar: "https://www.dreamwave.ai/_next/image?url=%2Fimages%2Ftestimonial2%2Fmaddie%2Fmaddie-input.jpeg&w=256&q=75"
        }
    },
    {
        id: 3,
        title: "Cập nhật chuyển nhượng cầu thủ phong trào",
        excerpt: "Một số đội bóng mạnh khu vực Gò Vấp và Bình Thạnh vừa có những bản hợp đồng đáng chú ý nhằm chuẩn bị cho mùa giải mới. Có cầu thủ được mời về với mức hỗ trợ phí sân và đồng phục.",
        image: "https://scov.gov.vn/upload/2005660/20230815/grab2f1a1ttxvn_giai_bong_da_hong_kong_2.jpg",
        category: "Chuyển nhượng phủi",
        date: new Date('2024-01-13'),
        author: {
            name: "Lê Phương",
            avatar: "https://www.dreamwave.ai/_next/image?url=%2Fimages%2Ftestimonial2%2Fmaddie%2Fmaddie-input.jpeg&w=256&q=75"
        }
    },
    {
        id: 4,
        title: "Bất ngờ ở vòng loại giải phong trào quận 10",
        excerpt: "Đội bóng được đánh giá thấp FC Phú Thọ đã giành chiến thắng trước ứng cử viên vô địch FC Nguyễn Tri Phương với tỉ số 3-2, gây bất ngờ lớn ở vòng loại.",
        image: "https://scov.gov.vn/upload/2005660/20230815/grab2f1a1ttxvn_giai_bong_da_hong_kong_2.jpg",
        category: "Giải Quận 10",
        date: new Date('2024-01-12'),
        author: {
            name: "Hoàng Anh",
            avatar: "https://www.dreamwave.ai/_next/image?url=%2Fimages%2Ftestimonial2%2Fmaddie%2Fmaddie-input.jpeg&w=256&q=75"
        }
    },
    {
        id: 5,
        title: "Tài năng trẻ nổi bật tại Học viện Bóng đá TP.HCM",
        excerpt: "Nhiều cầu thủ nhí đang thể hiện kỹ năng và tinh thần thi đấu nổi bật trong các buổi huấn luyện tại học viện bóng đá trẻ. Một số em đang được các lò đào tạo lớn để ý.",
        image: "https://scov.gov.vn/upload/2005660/20230815/grab2f1a1ttxvn_giai_bong_da_hong_kong_2.jpg",
        category: "Bóng đá trẻ",
        date: new Date('2024-01-11'),
        author: {
            name: "Phạm Quang",
            avatar: "https://www.dreamwave.ai/_next/image?url=%2Fimages%2Ftestimonial2%2Fmaddie%2Fmaddie-input.jpeg&w=256&q=75"
        }
    }
])

// Responsive options for carousel
const responsiveOptions = ref([
    {
        breakpoint: '1024px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '768px',
        numVisible: 1,
        numScroll: 1
    }
])

// Format date function
const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }).format(date)
}

onMounted(() => {
    console.log('News section mounted with', newsArticles.value.length, 'articles')
})
</script>

<style scoped>
.news-section {
    min-height: 600px;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}



@media (max-width: 768px) {
    .news-section {
        padding: 3rem 0;
    }

    .container {
        padding: 0 1rem;
    }
}
</style>