import { createRouter, createWebHistory } from 'vue-router'
import BoardList from '@/views/board/BoardList.vue'


const routes = [
  {
    path: '/board/list',
    name: 'BoardList',
    component: BoardList
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router