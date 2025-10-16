import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/global.css'
import router from './router'
import { pinia } from './store'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
