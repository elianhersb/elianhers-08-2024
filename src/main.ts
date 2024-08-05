import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from '@tanstack/vue-query';
import App from './App.vue';
import router from './router';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import ApexChartsPlugin from './plugins/apexcharts';

const app = createApp(App);

app.use(createPinia());
app.use(VueQueryPlugin);
app.use(router);
app.use(Toast);
app.use(ApexChartsPlugin);

app.mount('#app');
