import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login_Teacher.vue'
import Subject from '../views/T_Subject.vue'
import Announce from '../views/T_Announce.vue'
import StdList from '../views/T_StudentList.vue'
import Class from '../views/T_Class.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/helioscore',
    name: 'subject',
    component: Subject
  },
  {
    path: '/studentlist',
    name: 'studentlist',
    component: StdList
  },
  {
    path: '/announce',
    name: 'announce',
    component: Announce
  },
  {
    path: '/:classId',
    name: 'class',
    component: Class,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
