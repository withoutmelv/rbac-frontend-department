import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'ant-design:setting-outlined',
      keepAlive: true,
      order: 1000,
      title: '系统设置',
      perms: ['admin', 'sys:manager'],
    },
    name: 'sys:manager',
    path: '/sys/manager',
    children: [
      {
        meta: {
          icon: 'ant-design:user-outlined',
          title: '用户管理',
          perms: ['admin', 'sys:user'], // 拥有权限码才能访问
        },
        name: 'sys:user',
        path: '/sys/user/index',
        component: () => import('#/views/sys/user/index.vue'),
      },
      {
        meta: {
          icon: 'ant-design:team-outlined',
          title: '角色管理',
          perms: ['admin', 'sys:role'], // 拥有权限码才能访问
        },
        name: 'sys:role',
        path: '/sys/role/index',
        component: () => import('#/views/sys/role/index.vue'),
      },
      {
        meta: {
          icon: 'ant-design:menu-outlined',
          title: '菜单管理',
          perms: ['admin', 'sys:menu'], // 拥有权限码才能访问
        },
        name: 'sys:menu',
        path: '/sys/menu/index',
        component: () => import('#/views/sys/menu/index.vue'),
      },
      {
        meta: {
          icon: 'ant-design:deployment-unit-outlined',
          title: '部门管理',
          perms: ['admin', 'sys:dept'], // 拥有权限码才能访问
        },
        name: 'sys:dept',
        path: '/sys/dept/index',
        component: () => import('#/views/sys/dept/index.vue'),
      },
      {
        meta: {
          icon: 'ant-design:share-alt-outlined',
          title: '岗位管理',
          perms: ['admin', 'sys:post'], // 拥有权限码才能访问
        },
        name: 'sys:post',
        path: '/sys/post/index',
        component: () => import('#/views/sys/post/index.vue'),
      },
      {
        meta: {
          icon: 'ant-design:database-outlined',
          title: '数据字典',
          perms: ['admin', 'sys:dict'], // 拥有权限码才能访问
        },
        name: 'sys:dict',
        path: '/sys/dict/index',
        component: () => import('#/views/sys/dict/index.vue'),
      },
      {
        meta: {
          icon: 'ant-design:file-text-outlined',
          title: '参数配置',
          perms: ['admin', 'sys:config'], // 拥有权限码才能访问
        },
        name: 'sys:config',
        path: '/sys/config/index',
        component: () => import('#/views/sys/config/index.vue'),
      },
    ],
  },
];

export default routes;
