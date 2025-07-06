<template>
    <user_layout>
        <div
            class="bg-[url(/img/sanbong.jpg)] h-[40rem] bg-cover bg-no-repeat w-full flex justify-between items-center">
            <search_form ></search_form>
        </div>
        <promotions></promotions>
        <news></news>

    </user_layout>
</template>

<script setup>
import search_form from '../components/home/search_form.vue'
import promotions from '../components/home/promotions.vue'
import news from '../components/home/news.vue'
import user_layout from '../layout/user_layout.vue'

</script>