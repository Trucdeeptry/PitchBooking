import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import route from "./route.js";
import store from "./store/store.js";
import PrimeVue from 'primevue/config';

const vuejs = createApp(App)
vuejs.use(route);
vuejs.use(store);
vuejs.use(PrimeVue)
vuejs.mount('#app')
