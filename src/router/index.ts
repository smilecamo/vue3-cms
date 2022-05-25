import localCache from '@/utils/cache';
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { firstMenu } from '@/utils/map-menus';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/login',
    name: 'loginView',
    component: () => import('@/views/login/loginView.vue'),
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/mainView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token');
    if (!token) {
      return '/login';
    }
    // 如果跳转的是首页 则重定向到第一个菜单项中
    if (to.path === '/main') {
      return firstMenu.url;
    }
  }
});

export default router;
