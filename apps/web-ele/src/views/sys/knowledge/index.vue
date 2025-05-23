<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridListeners, VxeGridProps } from '#/adapter/vxe-table';

import { ref } from 'vue';

import { useAccess } from '@vben/access';
import { Page } from '@vben/common-ui';
import { useAccessStore,useUserStore } from '@vben/stores';

import { ElButton as Button, ElMessage as message } from 'element-plus';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { sysKnowledgePage, sysKnowledgeRemove } from '#/api/sys/knowledge';
import {KnowledgeBaseDelete} from '#/api/langChain/knowledge-base';
import { Icon } from '#/components/icon';
import { TableAction } from '#/components/table-action';

import DetailForm from './detail.vue';
import KnowledgeForm from './form.vue';
import { gridSchemas, searchFormSchemas } from './schemas/index';

const { hasAccessByCodes } = useAccess();
const accessStore = useAccessStore();
const userStore = useUserStore();
const hasTopTableDropDownActions = ref(false);
const knowledgeFormRef = ref();
const detailFormRef = ref();
const refreshKey = ref(new Date().getTime());
const currentFormValues = ref({}); // 存储当前表单的值

const formOptions: VbenFormProps = {
  ...searchFormSchemas,
  collapsed: true,
  handleSubmit: (values) => {
    currentFormValues.value = values;
    (gridApi as any).reloadTable();
  },
  handleReset: () => {
    currentFormValues.value = {};
    (gridApi as any).reloadTable();
  }
};

const gridOptions: VxeGridProps<any> = {
  ...gridSchemas,
  toolbarConfig: {
    ...gridSchemas.toolbarConfig,
    slots: {
      buttons: 'toolbar-buttons',
    },
    custom: {
      icon: 'vxe-icon-menu',
    },
  },
  border: false,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }) => {
        gridApi.formApi.setValues(currentFormValues.value)
        const formValues = currentFormValues.value;
        return await sysKnowledgePage({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          deptId: userStore.userInfo?.deptId,
          ...formValues,
        });
      },
    },
  },
};

const gridEvents: VxeGridListeners<any> = {
  checkboxChange() {
    const records = gridApi.grid.getCheckboxRecords();
    hasTopTableDropDownActions.value = records.length > 0;
  },
  checkboxAll() {
    const records = gridApi.grid.getCheckboxRecords();
    hasTopTableDropDownActions.value = records.length > 0;
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
  gridEvents,
});

const reloadTable = () => {
  refreshKey.value = new Date().getTime();
  gridApi.reload();
};
// 使用类型断言解决类型报错问题
(gridApi as any).reloadTable = reloadTable;

const handleAdd = () => {
  knowledgeFormRef.value.setData({
    isUpdate: false,
    gridApi,
  });
  knowledgeFormRef.value.open();
};

const handleEdit = (record: any) => {
  knowledgeFormRef.value.setData({
    record,
    isUpdate: true,
    gridApi,
  });
  knowledgeFormRef.value.open();
};

const handleDetail = (record: any) => {
  detailFormRef.value.setData({ record });
  detailFormRef.value.open();
};

const handleDelete = (row: any) => {
  let ids = [];
  let names = [];
  if (row) {
    ids.push(row.id);
    names.push(row.name);
  } else {
    ids = gridApi.grid.getCheckboxRecords().map((item) => item.id);
    names = gridApi.grid.getCheckboxRecords().map((item) => item.name);
  }
  names.forEach(KnowledgeBaseDelete);
  sysKnowledgeRemove({ ids }).then(() => {
    message.success('删除成功');
    (gridApi as any).reloadTable();
  });
};
</script>

<template>
  <Page auto-content-height>
    <Grid :key="refreshKey">
      <template #toolbar-buttons>
        <TableAction
          :actions="[
            {
              label: '新增',
              type: 'primary',
              icon: 'Plus',
              auth: ['admin', 'sys:knowledge:save'],
              onClick: handleAdd.bind(null),
            },
          ]"
          :drop-down-actions="[
            {
              label: '删除',
              icon: 'Delete',
              ifShow: hasTopTableDropDownActions,
              auth: ['admin', 'sys:knowledge:remove'],
              popConfirm: {
                title: '确定删除吗？',
                confirm: handleDelete.bind(null, false),
              },
            },
          ]"
        >
          <template #more>
            <Button style="margin-left: 8px">
              批量操作
              <Icon icon="el:arrow-down" />
            </Button>
          </template>
        </TableAction>
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
              auth: ['admin', 'sys:knowledge:detail'],
              onClick: handleDetail.bind(null, row),
            },
            {
              label: '编辑',
              type: 'primary',
              link: true,
              size: 'small',
              auth: ['admin', 'sys:knowledge:update'],
              onClick: handleEdit.bind(null, row),
            },
          ]"
          :drop-down-actions="[
            {
              label: '删除',
              icon: 'Delete',
              auth: ['admin', 'sys:knowledge:remove'],
              popConfirm: {
                title: '确定删除吗？',
                confirm: handleDelete.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </Grid>
    <KnowledgeForm ref="knowledgeFormRef" />
    <DetailForm ref="detailFormRef" />
  </Page>
</template>
