import { createRouter, createWebHistory } from 'vue-router';
import youngkwangRoutes from './youngkwang.js';
import yoseokRoutes from './yoseok.js';
import leekangRoutes from './leekang.js';
import junhyeokRoutes from './junhyeok.js'
import junheeRoutes from './junhee.js'
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

const routes = [...baseRoutes, ...youngkwangRoutes, ...yoseokRoutes, ...leekangRoutes
              , ...junhyeokRoutes, ...junheeRoutes];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;