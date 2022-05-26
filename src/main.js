import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import NavTeacher from '@/components/Nav_Teacher.vue'
import UploadFile from '@/components/T_Upload.vue'
import Announce from '@/components/T_Announce.vue'

const app = createApp(App).use(router)
app.component('navTeacher', NavTeacher)
app.component('uploadFile', UploadFile)
app.component('announceScore', Announce)
app.mount('#app')