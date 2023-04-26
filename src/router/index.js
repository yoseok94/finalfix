import { createRouter, createWebHistory } from 'vue-router'
import BoardList from '@/views/board/BoardList.vue'
import DashBoard from '@/views/common/DashBoard.vue'
import LoginPage from '@/views/common/LoginPage.vue'

const routes = [
  {
    path: '/',
    name: 'DashBoard',
    component: DashBoard
  },
  {
    path: '/board/list',
    name: 'BoardList',
    component: BoardList
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router