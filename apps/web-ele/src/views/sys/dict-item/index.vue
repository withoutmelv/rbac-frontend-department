<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridListeners, VxeGridProps } from '#/adapter/vxe-table';

import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { ElButton as Button, ElMessage as message } from 'element-plus';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { sysDictItemPage, sysDictItemRemove } from '#/api/sys/dict-item';
import { Icon } from '#/components/icon';
import { TableAction } from '#/components/table-action';

import DetailForm from './detail.vue';
import DictItemForm from './form.vue';
import { gridSchemas, searchFormSchemas } from './schemas';

const props = defineProps({
  dictId: {
    type: [String, Number],
    default: undefined,
  },
});
const hasTopTableDropDownActions = ref(false);
const dictItemFormRef = ref();
const detailFormRef = ref();
const formOptions: VbenFormProps = {
  ...searchFormSchemas,
  collapsed: true,
};

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
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await sysDictItemPage({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
          m_EQ_dictId: props.dictId,
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
};
const [Grid, gridApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
  gridEvents,
});

// 打开新增表单
const handleAdd = () => {
  dictItemFormRef.value.setData({
    isUpdate: false,
    gridApi,
  });
  dictItemFormRef.value.open();
};
// 打开编辑表单
const handleEdit = (record: any) => {
  dictItemFormRef.value.setData({
    record,
    isUpdate: true,
    gridApi,
  });
  dictItemFormRef.value.open();
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
  sysDictItemRemove({ ids }).then(() => {
    message.success('删除成功');
    gridApi.reload();
  });
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
              auth: ['admin', 'sys:dictItem:save'],
              onClick: handleAdd.bind(null),
            },
          ]"
          :drop-down-actions="[
            {
              label: '删除',
              icon: 'ep:delete',
              ifShow: hasTopTableDropDownActions,
              auth: ['admin', 'sys:dictItem:remove'],
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
              type: 'primary',
              link: true,
              size: 'small',
              auth: ['admin', 'sys:dictItem:detail'],
              onClick: handleDetail.bind(null, row),
            },
            {
              label: '编辑',
              type: 'primary',
              link: true,
              size: 'small',
              auth: ['admin', 'sys:dictItem:update'],
              onClick: handleEdit.bind(null, row),
            },
          ]"
          :drop-down-actions="[
            {
              label: '删除',
              icon: 'ep:delete',
              auth: ['admin', 'sys:dictItem:remove'],
              popConfirm: {
                title: '确定删除吗？',
                confirm: handleDelete.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </Grid>
    <DictItemForm ref="dictItemFormRef" :dict-id="dictId" />
    <DetailForm ref="detailFormRef" />
  </Page>
</template>
