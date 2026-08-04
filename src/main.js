import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import AOS from 'aos'

const app = createApp(App)

app.use(router)
app.mount('#app')
app.AOS = AOS.init({
    duration: 800,
    offset: 200
})
