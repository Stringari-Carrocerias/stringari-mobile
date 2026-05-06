import './assets/css/global.css';
import '@mdi/font/css/materialdesignicons.css'
import { Icon } from '@iconify/vue';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.component('Icon', Icon)
app.mount('#app');