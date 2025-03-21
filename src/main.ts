import '@mdi/font/css/materialdesignicons.css';
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import 'vuetify/styles/main.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import './assets/styles/main.scss'
// Создаем Vuetify экземпляр
const vuetify = createVuetify({
    components,
    directives,
})
const app = createApp(App)
app.use(vuetify)
app.use(createPinia())
app.mount('#app')

