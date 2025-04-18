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
      component: 'BasicLayout',
    },
    name: 'sys:manager',
    path: '/sys/manager',
    children: [
      {
        meta: {
          icon: 'ant-design:user-outlined',
          title: '用户管理',
          order: 10,
          perms: ['admin', 'sys:user'], // 拥有权限码才能访问
          component: '/sys/user/index',
          btns: {
            'sys:user:page': '分页查询用户',
            'sys:user:detail': '查看用户详情',
            'sys:user:save': '添加用户',
            'sys:user:update': '修改用户',
            'sys:user:remove': '删除用户',
            'sys:playUser': '扮演用户',
            'sys:user:grantRole': '授权角色',
            'sys:user:locked': '锁定用户',
            'sys:user:unLocked': '取消锁定',
          },
        },
        name: 'sys:user',
        path: '/sys/user/index',
        component: () => import('#/views/sys/user/index.vue'),
      },
      {
        meta: {
          icon: 'ant-design:team-outlined',
          title: '角色管理',
          order: 20,
          perms: ['admin', 'sys:role'], // 拥有权限码才能访问
          component: '/sys/role/index',
          btns: {
            'sys:role:page': '分页查询角色',
            'sys:role:detail': '查看角色详情',
            'sys:role:save': '添加角色',
            'sys:role:update': '修改角色',
            'sys:role:remove': '删除角色',
            'sys:rbac:saveRoleMenu': '设置权限（保存角色菜单关系）',
            'sys:rbac:userListByRoleId': '成员管理（通过角色ID获取用户列表）',
            'sys:rbac:saveUserRole': '成员管理（添加用户角色关系）',
            'sys:rbac:userListExcludeRoleId':
              '成员管理（获取用户列表-排除指定角色）',
            'sys:rbac:removeUserRole': '成员管理（删除用户角色关系）',
          },
        },
        name: 'sys:role',
        path: '/sys/role/index',
        component: () => import('#/views/sys/role/index.vue'),
      },
      {
        meta: {
          icon: 'ant-design:menu-outlined',
          title: '菜单管理',
          order: 30,
          perms: ['admin', 'sys:menu'], // 拥有权限码才能访问
          component: '/sys/menu/index',
          btns: {
            'sys:menu:list': '菜单列表',
            'sys:menu:tree': '菜单树',
            'sys:menu:detail': '查看菜单详情',
            'sys:menu:save': '添加菜单',
            'sys:menu:update': '修改菜单',
            'sys:menu:remove': '删除菜单',
          },
        },
        name: 'sys:menu',
        path: '/sys/menu/index',
        component: () => import('#/views/sys/menu/index.vue'),
      },
      {
        name: 'sys:routelist',
        path: '/sys/menu/routelist',
        component: () => import('#/views/sys/menu/route-make-list.vue'),
        meta: {
          title: '前端路由',
          order: 40,
          icon: 'ant-design:ordered-list-outlined',
          perms: ['admin', 'sys:routelist'],
          component: '/sys/menu/route-make-list',
          btns: {
            'sys:menu:syncRoute': '同步前端路由',
            'btn:route:config': '查看路由配置',
            'btn:copy:idAndPidData': '复制id/pid数据',
            'btn:copy:antTreData': '复制AntTreeData',
          },
        },
      },
      {
        meta: {
          icon: 'ant-design:deployment-unit-outlined',
          title: '部门管理',
          order: 50,
          perms: ['admin', 'sys:dept'], // 拥有权限码才能访问
          component: '/sys/dept/index',
          btns: {
            'sys:dept:list': '部门列表',
            'sys:dept:tree': '部门树',
            'sys:dept:detail': '查看部门详情',
            'sys:dept:save': '添加部门',
            'sys:dept:update': '修改部门',
            'sys:dept:remove': '删除部门',
          },
        },
        name: 'sys:dept',
        path: '/sys/dept/index',
        component: () => import('#/views/sys/dept/index.vue'),
      },
      {
        meta: {
          icon: 'ant-design:share-alt-outlined',
          title: '岗位管理',
          order: 60,
          perms: ['admin', 'sys:post'], // 拥有权限码才能访问
          component: '/sys/post/index',
          btns: {
            'sys:post:page': '分页查询岗位',
            'sys:post:detail': '查看岗位详情',
            'sys:post:save': '添加岗位',
            'sys:post:update': '修改岗位',
            'sys:post:remove': '删除岗位',
          },
        },
        name: 'sys:post',
        path: '/sys/post/index',
        component: () => import('#/views/sys/post/index.vue'),
      },
      {
        meta: {
          icon: 'ant-design:database-outlined',
          title: '数据字典',
          order: 70,
          perms: ['admin', 'sys:dict'], // 拥有权限码才能访问
          component: '/sys/dict/index',
          btns: {
            'sys:dict:page': '分页查询字典',
            'sys:dict:detail': '查看参数字典',
            'sys:dict:save': '添加字典',
            'sys:dict:update': '修改字典',
            'sys:dict:remove': '删除字典',
            'sys:dictItem:page': '分页查询字典项',
            'sys:dictItem:detail': '查看参数字典项',
            'sys:dictItem:save': '添加字典项',
            'sys:dictItem:update': '修改字典项',
            'sys:dictItem:remove': '删除字典项',
            'sys:dict:enumDictList': '枚举字典列表',
            'sys:dict:customDictList': '自定义字典列表',
          },
        },
        name: 'sys:dict',
        path: '/sys/dict/index',
        component: () => import('#/views/sys/dict/index.vue'),
      },
      {
        meta: {
          icon: 'ant-design:file-text-outlined',
          title: '参数配置',
          order: 80,
          perms: ['admin', 'sys:config'], // 拥有权限码才能访问
          component: '/sys/config/index',
          btns: {
            'sys:config:page': '分页查询参数配置',
            'sys:config:detail': '查看参数配置详情',
            'sys:config:save': '添加参数配置',
            'sys:config:update': '修改参数配置',
            'sys:config:remove': '删除参数配置',
          },
        },
        name: 'sys:config',
        path: '/sys/config/index',
        component: () => import('#/views/sys/config/index.vue'),
      },
    ],
  },
];

export default routes;
