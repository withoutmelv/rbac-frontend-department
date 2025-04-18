<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridListeners, VxeGridProps } from '#/adapter/vxe-table';

import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { ElButton as Button, ElMessage as message } from 'element-plus';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { sysDictPage, sysDictRemove } from '#/api/sys/dict';
import { Icon } from '#/components/icon';
import { TableAction } from '#/components/table-action';

import DetailForm from './detail.vue';
import DictItemWrap from './dict-item-wrap.vue';
import EnumDict from './enum-dict.vue';
import DictForm from './form.vue';
import { gridSchemas, searchFormSchemas } from './schemas';

const hasTopTableDropDownActions = ref(false);
const dictFormRef = ref();
const dictItemWrapRef = ref();
const detailFormRef = ref();
const enumDictRef = ref();
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
        return await sysDictPage({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
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
  dictFormRef.value.setData({
    isUpdate: false,
    gridApi,
  });
  dictFormRef.value.open();
};
// 打开编辑表单
const handleEdit = (record: any) => {
  dictFormRef.value.setData({
    record,
    isUpdate: true,
    gridApi,
  });
  dictFormRef.value.open();
};
// 打开详情
const handleDetail = (record: any) => {
  detailFormRef.value.setData({
    record,
  });
  detailFormRef.value.open();
};
// 字典项
const handleDictItem = (record: any) => {
  dictItemWrapRef.value.setData({
    record,
  });
  dictItemWrapRef.value.open();
};
// 枚举字典和自定义字典
const handleEnumDict = (type: string) => {
  enumDictRef.value.setData({
    type,
  });
  enumDictRef.value.open();
};
// 删除
const handleDelete = (row: any) => {
  let ids = [];
  if (row) {
    ids.push(row.id);
  } else {
    ids = gridApi.grid.getCheckboxRecords().map((item) => item.id);
  }
  sysDictRemove({ ids }).then(() => {
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
              auth: ['admin', 'sys:dict:save'],
              onClick: handleAdd.bind(null),
            },
            {
              label: '枚举字典',
              type: 'primary',
              icon: 'ep:discount',
              auth: ['admin', 'sys:dict:enumDictList'],
              onClick: handleEnumDict.bind(null, 'enum'),
            },
            {
              label: '自定义字典',
              type: 'primary',
              icon: 'ep:school',
              auth: ['admin', 'sys:dict:customDictList'],
              onClick: handleEnumDict.bind(null, 'custom'),
            },
          ]"
          :drop-down-actions="[
            {
              label: '删除',
              icon: 'ep:delete',
              ifShow: hasTopTableDropDownActions,
              auth: ['admin', 'sys:dict:remove'],
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
              <Icon icon="ep:arrow-down" />
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
              auth: ['admin', 'sys:dict:detail'],
              onClick: handleDetail.bind(null, row),
            },
            {
              label: '字典项',
              type: 'primary',
              link: true,
              size: 'small',
              auth: ['admin', 'sys:dictDict:page'],
              onClick: handleDictItem.bind(null, row),
            },
          ]"
          :drop-down-actions="[
            {
              label: '编辑',
              type: 'primary',
              link: true,
              size: 'small',
              icon: 'ep:edit',
              auth: ['admin', 'sys:dict:update'],
              onClick: handleEdit.bind(null, row),
            },
            {
              label: '删除',
              icon: 'ep:delete',
              auth: ['admin', 'sys:dict:remove'],
              popConfirm: {
                title: '确定删除吗？',
                confirm: handleDelete.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </Grid>
    <DictForm ref="dictFormRef" />
    <DetailForm ref="detailFormRef" />
    <DictItemWrap ref="dictItemWrapRef" />
    <EnumDict ref="enumDictRef" />
  </Page>
</template>
