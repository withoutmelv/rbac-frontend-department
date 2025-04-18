<script lang="ts" setup>
import type { VxeGridListeners, VxeGridProps } from '#/adapter/vxe-table';

import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  devSchemaFieldPage,
  devSchemaFieldRemove,
  updateSort,
} from '#/api/dev/schema-field';
import { Icon } from '#/components/icon';
import { TableAction } from '#/components/table-action';

import DetailForm from './detail.vue';
import SchemaFieldForm from './form.vue';
import { gridSchemas } from './schemas';
import UpdateKeys from './update-keys.vue';

const props = defineProps({
  schemaId: {
    type: [String, Number],
    default: undefined,
  },
});
const hasTopTableDropDownActions = ref(false);
const schemaFieldFormRef = ref();
const detailFormRef = ref();
const updateKeysRef = ref();

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
  },
  border: false,
  height: 'auto',
  keepSource: true,
  pagerConfig: {
    pageSize: 10,
  },
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await devSchemaFieldPage({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
          m_EQ_schemaId: props.schemaId,
        });
      },
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
  rowDragend(e: any) {
    updateSort({
      dragRowId: e.oldRow.id,
      hoverRowId: e.newRow.id,
      schemaId: props.schemaId,
    }).then(() => {
      // eslint-disable-next-line no-use-before-define
      gridApi.reload();
    });
  },
};
const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
  gridEvents,
});

// 打开新增表单
const handleAdd = () => {
  schemaFieldFormRef.value.setData({
    isUpdate: false,
    gridApi,
    record: {
      schemaId: props.schemaId,
    },
  });
  schemaFieldFormRef.value.open();
};
// 打开编辑表单
const handleEdit = (record: any) => {
  schemaFieldFormRef.value.setData({
    record,
    isUpdate: true,
    gridApi,
  });
  schemaFieldFormRef.value.open();
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
  let ids = [];
  if (row) {
    ids.push(row.id);
  } else {
    ids = gridApi.grid.getCheckboxRecords().map((item) => item.id);
  }
  devSchemaFieldRemove({ ids }).then(() => {
    message.success('删除成功');
    gridApi.reload();
  });
};
const handleOpenUpdateKeys = () => {
  updateKeysRef.value.setData({
    record: {
      schemaId: props.schemaId,
    },
  });
  updateKeysRef.value.open();
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
              icon: 'ant-design:plus-outlined',
              auth: ['admin', 'dev:schemaField:save'],
              onClick: handleAdd.bind(null),
            },
            {
              label: '调整搜索/列表排序',
              icon: 'ant-design:ordered-list-outlined',
              type: 'default',
              auth: [
                'admin',
                'dev:schema:updateSearchFormKeys',
                'dev:schema:updateListKeys',
              ],
              onClick: handleOpenUpdateKeys.bind(null),
            },
          ]"
          :drop-down-actions="[
            {
              label: '删除',
              icon: 'ant-design:delete-outlined',
              ifShow: hasTopTableDropDownActions,
              auth: ['admin', 'dev:schemaField:remove'],
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
              <Icon icon="ant-design:down-outlined" />
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
              type: 'link',
              size: 'small',
              auth: ['admin', 'dev:schemaField:detail'],
              onClick: handleDetail.bind(null, row),
            },
            {
              label: '编辑',
              type: 'link',
              size: 'small',
              auth: ['admin', 'dev:schemaField:update'],
              onClick: handleEdit.bind(null, row),
            },
          ]"
          :drop-down-actions="[
            {
              label: '删除',
              icon: 'ant-design:delete-outlined',
              auth: ['admin', 'dev:schemaField:remove'],
              popConfirm: {
                title: '确定删除吗？',
                confirm: handleDelete.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </Grid>
    <SchemaFieldForm ref="schemaFieldFormRef" />
    <DetailForm ref="detailFormRef" />
    <UpdateKeys ref="updateKeysRef" />
  </Page>
</template>
