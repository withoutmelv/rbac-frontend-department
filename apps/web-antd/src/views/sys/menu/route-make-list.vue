<script setup lang="ts">
import { h, ref } from 'vue';

import { Page } from '@vben/common-ui';
import { useAccessStore } from '@vben/stores';
import { cloneDeep } from '@vben/utils';

import { message, Tag } from 'ant-design-vue';

import {
  useVbenVxeGrid,
  type VxeGridListeners,
  type VxeGridProps,
} from '#/adapter/vxe-table';
import { menuSyncRoute } from '#/api/sys/menu';
import Icon from '#/components/icon/icon.vue';
import { TableAction } from '#/components/table-action';
import { $t } from '#/locales';
import { omit } from '#/util/tool';

import ViewRouteConfig from './view-route-config.vue';

const accessStore = useAccessStore();
const transformBtns = (btns: any) => {
  if (!btns || Object.keys(btns).length === 0) return undefined;
  return Object.keys(btns).map((key) => {
    return {
      code: key,
      name: btns[key],
      type: key.startsWith('btn:') ? 3 : 4,
      isSync: 1,
    };
  });
};
const transformRoute = (asyncRoutes: any) => {
  const res: any = [];
  if (!asyncRoutes) return undefined;
  // 排序
  asyncRoutes.sort((a: any, b: any) => {
    return (a.meta.order || 0) - (b.meta.order || 0);
  });
  asyncRoutes.forEach((element: any) => {
    let children = transformRoute(element.children);
    if (!children) {
      children = transformBtns(element.meta.btns);
    }

    const componentName = element?.meta?.component;
    res.push({
      code: element.name,
      name: element.meta.title,
      sort: element.meta.order || 999,
      path: element.path,
      component: componentName,
      type:
        ['BasicLayout'].includes(componentName) ||
        ['Dashboard', 'VbenProject'].includes(element.name)
          ? 1
          : 2,
      ignoreSync: element.meta.ignoreSync,
      icon: element.meta?.icon || '',
      isShow: element?.meta?.hideInMenu === true ? 0 : 1,
      isLink: element?.meta?.link ? 1 : 0,
      isCache: element?.meta?.keepAlive === false ? 0 : 1,
      isSync: element?.meta?.ignoreSync === true ? 0 : 1,
      perms: element.meta?.perms,
      openType: 1,
      ext: {
        ...omit(element.meta, ['title']),
        redirect: element.redirect,
      },
      children,
    });
  });
  return res;
};
const treeData = transformRoute(cloneDeep(accessStore.accessRoutes));
const gridEvents: VxeGridListeners = {};
const gridOptions: VxeGridProps = {
  height: 'auto',
  toolbarConfig: {
    slots: {
      buttons: 'toolbar-buttons',
    },
  },
  columns: [
    {
      field: 'name',
      title: '路由标题',
      treeNode: true,
      align: 'left',
      slots: {
        default: ({ row }) => {
          const nodes = [];
          if (row.icon) {
            nodes.push(
              h(Icon, {
                icon: row.icon,
              }),
            );
          }
          nodes.push(
            h(
              'span',
              {
                style: {
                  paddingLeft: row.icon ? '8px' : '',
                },
              },
              $t(row.name),
            ),
          );
          return nodes;
        },
      },
    },
    {
      field: 'type',
      title: '菜单类型',
      slots: {
        default: 'type',
      },
    },
    { field: 'code', title: '路由名称(权限标识)' },
    { field: 'path', title: '路由/接口地址' },

    {
      title: '是否同步',
      field: 'ignoreSync',
      slots: { default: 'ignoreSync' },
    },
    {
      title: '可访问权限定义',
      field: 'perms',
      slots: { default: 'perms' },
    },
  ],

  data: treeData,
  treeConfig: {
    rowField: 'name',
    childrenField: 'children',
  },
  pagerConfig: {
    enabled: false,
  },
  proxyConfig: {
    enabled: false,
  },
};
const [Grid] = useVbenVxeGrid({ gridEvents, gridOptions });
const loading = ref<boolean>(false);
const handleUpdateRoute = () => {
  loading.value = true;
  menuSyncRoute(treeData)
    .then(() => {
      message.success('路由同步成功！');
    })
    .finally(() => {
      loading.value = false;
    });
};
const ViewRouteConfigRef = ref();
// 查看路由配置
const handleOpenViewRouteConfig = () => {
  ViewRouteConfigRef.value.setData({
    record: accessStore.accessRoutes,
  });
  ViewRouteConfigRef.value.open();
};
</script>
<template>
  <Page auto-content-height>
    <Grid>
      <template #type="{ row }">
        <Tag v-if="row.type === 1" color="orange">目录</Tag>
        <Tag v-else-if="row.type === 2" color="orange">菜单</Tag>
        <Tag v-else-if="row.type === 3" color="orange">按钮</Tag>
        <Tag v-else-if="row.type === 4" color="orange">接口</Tag>
        <Tag v-else color="blue">其他</Tag>
      </template>
      <template #perms="{ row }">
        <Tag v-for="item in row.perms || []" :key="item">{{ item }}</Tag>
      </template>
      <template #ignoreSync="{ row }">
        <span>{{ row.ignoreSync ? '否' : '是' }}</span>
      </template>
      <template #toolbar-buttons>
        <TableAction
          :actions="[
            {
              label: '同步路由清单',
              type: 'primary',
              icon: 'ant-design:sync-outlined',
              auth: ['admin', 'sys:menu:syncRoute'],
              loading: loading as any,
              onClick: handleUpdateRoute.bind(null),
            },
            {
              label: '查看路由配置',
              type: 'primary',
              icon: 'ant-design:eye-outlined',
              auth: ['admin', 'btn:route:config'],
              onClick: handleOpenViewRouteConfig.bind(null),
            },
          ]"
        />
      </template>
      <template #toolbar-tools></template>
    </Grid>
    <ViewRouteConfig ref="ViewRouteConfigRef" />
  </Page>
</template>
<style lang="less" scoped></style>
