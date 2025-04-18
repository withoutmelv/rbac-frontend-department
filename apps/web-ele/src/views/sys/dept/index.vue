<script lang="ts" setup>
import type { VxeGridListeners, VxeGridProps } from '#/adapter/vxe-table';

import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { ElMessage as message } from 'element-plus';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { sysDeptList, sysDeptRemove } from '#/api/sys/dept';
import { TableAction } from '#/components/table-action';
import { getChildIds } from '#/util/tool';

import DetailForm from './detail.vue';
import DeptForm from './form.vue';
import { gridSchemas } from './schemas';

const hasTopTableDropDownActions = ref(false);
const deptFormRef = ref();
const detailFormRef = ref();
const isExpand = ref(false);
const gridOptions: VxeGridProps<any> = {
  ...gridSchemas,
  toolbarConfig: {
    ...gridSchemas.toolbarConfig,
    slots: {
      buttons: 'toolbar-buttons',
    },
    custom: {
      // 自定义列-图标
      icon: 'vxe-icon-menu',
    },
    refresh: {
      queryMethod: () => {
        // eslint-disable-next-line no-use-before-define
        reload();
      },
    },
  },
  border: false,
  height: 'auto',
  keepSource: true,
  pagerConfig: {
    enabled: false,
  },
  treeConfig: {
    transform: true,
    rowField: 'id',
    parentField: 'parentId',
  },
  proxyConfig: {
    ajax: {
      query: async () => {
        return await sysDeptList({});
      },
    },
    response: {
      list: '',
    },
  },
};
const gridEvents: VxeGridListeners<any> = {
  checkboxChange() {
    // eslint-disable-next-line no-use-before-define
    const records = gridApi.grid.getCheckboxRecords();
    hasTopTableDropDownActions.value = records.length > 0;
  },
  checkboxAll() {
    // eslint-disable-next-line no-use-before-define
    const records = gridApi.grid.getCheckboxRecords();
    hasTopTableDropDownActions.value = records.length > 0;
  },
};
const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
  gridEvents,
});
/**
 * 自定义刷新方法
 */
const reload = () => {
  gridApi.reload().then(() => {
    if (isExpand.value) {
      isExpand.value = false;
      // eslint-disable-next-line no-use-before-define
      handleExpandAndCollapse();
    }
  });
};
// 打开新增表单
const handleAdd = (record: any) => {
  deptFormRef.value.setData({
    record,
    isUpdate: false,
    gridApi: {
      ...gridApi,
      reload,
    },
  });
  deptFormRef.value.open();
};
// 打开编辑表单
const handleEdit = (record: any) => {
  deptFormRef.value.setData({
    record,
    isUpdate: true,
    gridApi: {
      ...gridApi,
      reload,
    },
  });
  deptFormRef.value.open();
};
// 打开详情
const handleDetail = (record: any) => {
  detailFormRef.value.setData({
    record,
  });
  detailFormRef.value.open();
};
// 删除
const handleDelete = (row: any) => {
  const ids = [];
  if (row) {
    ids.push(...getChildIds(row));
  }
  sysDeptRemove({ ids }).then(() => {
    message.success('删除成功');
    reload();
  });
};
/**
 * 展开/折叠
 */
const handleExpandAndCollapse = () => {
  if (isExpand.value) {
    gridApi.grid.setAllTreeExpand(false);
    isExpand.value = false;
  } else {
    gridApi.grid.setAllTreeExpand(true);
    isExpand.value = true;
  }
};
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-buttons>
        <TableAction
          :actions="[
            {
              label: '新增',
              type: 'primary',
              icon: 'ep:plus',
              auth: ['admin', 'sys:dept:save'],
              onClick: handleAdd.bind(null, {}),
            },
            {
              label: isExpand ? '折叠' : '展开',
              type: 'primary',
              icon: isExpand ? 'ep:folder-opened' : 'ep:folder',
              onClick: handleExpandAndCollapse.bind(null),
            },
          ]"
        />
      </template>
      <template #toolbar-tools></template>
      <template #ACTION="{ row }">
        <TableAction
          :actions="[
            {
              label: '详情',
              type: 'primary',
              link: true,
              size: 'small',
              auth: ['admin', 'sys:dept:detail'],
              onClick: handleDetail.bind(null, row),
            },
            {
              label: '编辑',
              type: 'primary',
              link: true,
              size: 'small',
              auth: ['admin', 'sys:dept:update'],
              onClick: handleEdit.bind(null, row),
            },
          ]"
          :drop-down-actions="[
            {
              label: '添加下级',
              type: 'primary',
              link: true,
              icon: 'ep:plus',
              size: 'small',
              auth: ['admin', 'sys:dept:save'],
              onClick: handleAdd.bind(null, {
                parentId: row.id,
              }),
            },
            {
              label: '删除',
              icon: 'ep:delete',
              auth: ['admin', 'sys:dept:remove'],
              popConfirm: {
                title: '确定删除吗？',
                confirm: handleDelete.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </Grid>
    <DeptForm ref="deptFormRef" />
    <DetailForm ref="detailFormRef" />
  </Page>
</template>
