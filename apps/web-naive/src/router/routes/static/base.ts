import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'ant-design:user-outlined',
      keepAlive: true,
      order: 1000,
      title: '个人中心',
      hideInMenu: true,
      ignoreSync: true,
      component: 'BasicLayout',
    },
    name: 'personal:manager',
    path: '/sys/manager',
    children: [
      {
        meta: {
          icon: 'ant-design:user-switch-outlined',
          title: '个人中心',
          hideInMenu: true,
          ignoreSync: true,
          component: '/sys/personal/index',
        },
        name: 'sys:personal',
        path: '/sys/personal/index',
        component: () => import('#/views/sys/personal/index.vue'),
      },
    ],
  },
];

export default routes;
