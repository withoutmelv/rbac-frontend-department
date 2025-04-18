<script lang="ts" setup>
import { h, reactive, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import {
  useVbenVxeGrid,
  type VxeGridListeners,
  type VxeGridProps,
} from '#/adapter/vxe-table';
import { devSchemaDbTable, devSchemaImportTable } from '#/api/dev/schema';
import { devSchemaGroupPage } from '#/api/dev/schema-group';
import { Icon } from '#/components/icon';

const dataSource = ref([]);
const gridOptions = reactive<VxeGridProps<any>>({
  toolbarConfig: {
    // refresh: true, // 刷新
    // custom: {
    //   // 自定义列-图标
    //   icon: 'vxe-icon-menu',
    // },
  },
  radioConfig: {
    labelField: 'name',
    checkMethod: ({ row }) => {
      return !row.disabled;
    },
  },
  columns: [
    {
      field: 'name',
      type: 'radio',
      title: '分组名称',
      align: 'left',
      slots: {
        default: ({ row }: any) => {
          if (row.icon) {
            return h('span', {}, [
              h(Icon, { icon: row.icon }),
              h(
                'span',
                {
                  style: {
                    paddingLeft: row.icon ? '8px' : '',
                  },
                },
                row.name,
              ),
            ]);
          }
          return h('span', {}, row.name);
        },
      },
    },
    { field: 'code', title: '唯一编码', align: 'left' },
  ],
  data: [],
  border: false,
  keepSource: true,
  pagerConfig: {
    pageSize: 10,
  },
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await devSchemaGroupPage({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
});
const gridEvents: VxeGridListeners<any> = {};
const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
  gridEvents,
  formOptions: {
    schema: [
      {
        component: 'Input',
        fieldName: 'm_LIKE_name',
        labelWidth: 60,
        label: '分组名称',
        componentProps: {
          placeholder: '请输入分组名称',
          allowClear: true,
        },
      },
      {
        component: 'Input',
        fieldName: 'm_LIKE_code',
        labelWidth: 60,
        label: '分组编码',
        componentProps: {
          placeholder: '请输入分组编码',
          allowClear: true,
        },
      },
    ],
  },
});
const tableNames = ref<Array<string>>([]);
const parentGridApi = ref();
const [Drawer, DrawerApi] = useVbenDrawer({
  onOpenChange(isOpen) {
    if (isOpen) {
      parentGridApi.value = DrawerApi.getData().gridApi;
      tableNames.value = DrawerApi.getData().tableNames || [];
      devSchemaDbTable({}).then((res) => {
        dataSource.value = res;
        gridApi.reload();
      });
    }
  },
  onConfirm() {
    const record = gridApi.grid.getRadioRecord();
    if (!record) {
      message.warning('请选择所属分组');
    }
    devSchemaImportTable({
      schemaGroupId: record.id,
      tableNames: tableNames.value,
    }).then(() => {
      message.success('导入成功');
      parentGridApi.value.reload();
      DrawerApi.close();
    });
  },
});
defineExpose(DrawerApi);
</script>
<template>
  <div>
    <Drawer class="w-[60%]" title="选择分组">
      <Grid />
    </Drawer>
  </div>
</template>
<style lang="less" scoped></style>
