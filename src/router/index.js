import { createRouter, createWebHistory } from 'vue-router';
import youngkwangjs from './youngkwang.js';
import yoseokjs from './yoseok.js';
import leekangjs from './leekang.js';
import junhyeokjs from './junhyeok.js'
import junheejs from './junhee.js'
import DashBoard from '@/views/common/DashBoard.vue';
import LoginPage from '@/views/common/LoginPage.vue';

const baseRoutes = [
  {
    path: '/',
    name: 'DashBoard',
    component: DashBoard,
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
];

const routes = [...baseRoutes, ...youngkwangjs, ...yoseokjs, ...leekangjs
              , ...junhyeokjs, ...junheejs];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;