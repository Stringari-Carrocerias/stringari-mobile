import './assets/css/global.css';
import '@mdi/font/css/materialdesignicons.css'
import 'https://kit.fontawesome.com/dee23b2436.js'
import { Icon } from '@iconify/vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

library.add(faMagnifyingGlass)

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.component('Icon', Icon)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app');