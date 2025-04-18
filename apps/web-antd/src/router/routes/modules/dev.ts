import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'ant-design:cloud-outlined',
      keepAlive: true,
      order: 1010,
      title: '在线开发',
      perms: ['admin', 'dev:manager'],
      component: 'BasicLayout',
    },
    name: 'dev:manager',
    path: '/dev/manager',
    children: [
      {
        meta: {
          icon: 'ant-design:group-outlined',
          title: '模型分组',
          order: 10,
          perms: ['admin', 'dev:schemaGroup'], // 拥有权限码才能访问
          component: '/dev/schema-group/index',
          btns: {
            'dev:schemaGroup:page': '分页查询模型分组',
            'dev:schemaGroup:detail': '查看模型分组详情',
            'dev:schemaGroup:save': '添加模型分组',
            'dev:schemaGroup:update': '修改模型分组',
            'dev:schemaGroup:remove': '删除模型分组',
          },
        },
        name: 'dev:schemaGroup',
        path: '/dev/schema-group/index',
        component: () => import('#/views/dev/schema-group/index.vue'),
      },
      {
        meta: {
          icon: 'ant-design:database-outlined',
          title: '数据模型',
          order: 20,
          perms: ['admin', 'dev:schema'], // 拥有权限码才能访问
          component: '/dev/schema/index',
          btns: {
            'dev:schema:page': '分页查询数据模型',
            'dev:schema:detail': '查看数据模型详情',
            'dev:schema:save': '添加数据模型',
            'dev:schema:update': '修改数据模型',
            'dev:schema:remove': '删除数据模型',
            'dev:schema:importTable': '导入数据库表',
            'dev:schema:getByTableName': '查看元数据',
            'dev:schemaField:page': '分页查询模型字段',
            'dev:schemaField:detail': '查看模型字段详情',
            'dev:schemaField:save': '添加模型字段',
            'dev:schemaField:update': '修改模型字段',
            'dev:schemaField:remove': '删除模型字段',
            'dev:schemaField:updateSort': '更新模型字段排序',
            'dev:schema:updateSearchFormKeys': '更新搜索表单字段Key',
            'dev:schema:updateListKeys': '更新列表字段Key',
          },
        },
        name: 'dev:schema',
        path: '/dev/schema/index',
        component: () => import('#/views/dev/schema/index.vue'),
      },
    ],
  },
];

export default routes;
