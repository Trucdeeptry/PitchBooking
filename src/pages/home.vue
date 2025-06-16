<template>
    <user_layout>
        <div
            class="bg-[url(/img/sanbong.jpg)] h-[40rem] bg-cover bg-no-repeat w-full flex justify-between items-center">
            <search_form @sendSearchData="goToBooking"></search_form>
        </div>
        <promotions></promotions>
        <news></news>

    </user_layout>
</template>

<script setup>
import search_form from '../components/search_form.vue'
import promotions from '../components/promotions.vue'
import news from '../components/news.vue'
import user_layout from '../layout/user_layout.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToBooking = (data) => {

    router.push({
        path: '/booking',
        query: data
    })
}
</script>