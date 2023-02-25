import { createApp } from 'vue'
import Terminal from './Terminal.vue'
import { createPinia } from 'pinia'

import './assets/sass/app.scss'


createApp(Terminal)
    .use(createPinia())
    .mount('#app')
