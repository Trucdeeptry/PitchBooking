<template>
    <home_header></home_header>
    <slot></slot>
    <home_footer></home_footer>
</template>


<script setup>
import home_header from '../components/home_header.vue'
import home_footer from '../components/home_footer.vue'
</script>