import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import NavTeacher from '@/components/Nav_Teacher.vue'

const app = createApp(App).use(router)
app.component('navTeacher', NavTeacher)

app.mount('#app')
