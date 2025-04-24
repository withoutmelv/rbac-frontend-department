import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'HomePage',
    path: '/homePage',
    component: () => import('#/views/dashboard/homePage/index.vue'),
    meta: {
      affixTab: true,
      icon: 'House',
      title: '首页',
    },
  },
  {
    name: 'AIChat',
    path: '/aiChat',
    component: () => import('#/views/dashboard/homePage/chat.vue'),
    meta: {
      icon: 'ChatLineRound',
      title: 'AI赋能支撑平台',
      hideInMenu: true,
    },
  }
];

export default routes;
