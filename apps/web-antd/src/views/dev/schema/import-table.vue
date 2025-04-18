<script lang="ts" setup>
import { reactive, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import {
  useVbenVxeGrid,
  type VxeGridListeners,
  type VxeGridProps,
} from '#/adapter/vxe-table';
import { devSchemaDbTable } from '#/api/dev/schema';

import SelectSchemaGroup from './select-schema-group.vue';

const dataSource = ref([]);
const keywords = ref('');
const selectSchemaGroupRef = ref();
const handlePage = (params: {
  keywords?: string;
  pageNum: number;
  pageSize: number;
}) => {
  // 获取参数
  const { pageNum, pageSize, keywords } = params;
  // 过滤数据源
  let filteredDataSource = dataSource.value;
  if (keywords) {
    // 根据 keywords 过滤数据
    filteredDataSource = dataSource.value.filter((item: any) => {
      return (
        item.name?.toLowerCase().includes(keywords.toLowerCase()) ||
        item.comment.toLowerCase().includes(keywords.toLowerCase())
      );
    });
  }
  // 计算总页数和当前页的数据
  const totalPage = Math.ceil(filteredDataSource.length / pageSize);
  const rows = filteredDataSource.slice(
    (pageNum - 1) * pageSize,
    pageNum * pageSize,
  );
  // 返回分页结果
  return Promise.resolve({
    recordCount: filteredDataSource.length,
    totalPage,
    rows,
  });
};
const gridOptions = reactive<VxeGridProps<any>>({
  toolbarConfig: {
    // refresh: true, // 刷新
    // custom: {
    //   // 自定义列-图标
    //   icon: 'vxe-icon-menu',
    // },
  },
  checkboxConfig: {
    labelField: 'name',
    checkMethod: ({ row }) => {
      return !row.disabled;
    },
  },
  columns: [
    {
      field: 'name',
      type: 'checkbox',
      title: '表名称',
      align: 'left',
    },
    { field: 'comment', title: '表注释', align: 'left' },
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
        return await handlePage({
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
    showDefaultActions: false,
    wrapperClass: 'grid-cols-2',
    schema: [
      {
        component: 'Input',
        fieldName: 'keywords',
        labelWidth: 60,
        label: '关键字',
        formItemClass: 'col-span-1',
        componentProps: {
          placeholder: '请输入关键字',
          allowClear: true,
          onChange: (e: any) => {
            keywords.value = e.target.value;

            gridApi.reload({
              keywords: keywords.value,
            });
          },
        },
      },
    ],
  },
});
const [Modal, ModalApi] = useVbenModal({
  onOpenChange(isOpen) {
    if (isOpen) {
      devSchemaDbTable({}).then((res) => {
        dataSource.value = res;
        gridApi.reload();
      });
    }
  },
  onConfirm() {
    const records = gridApi.grid.getCheckboxRecords();
    if (records.length === 0) {
      message.warning('请选择要导入的数据表');
      return;
    }
    selectSchemaGroupRef.value.setData({
      tableNames: records.map((item) => item.name),
      gridApi: {
        ...gridApi,
        reload: () => {
          devSchemaDbTable({}).then((res) => {
            dataSource.value = res;
            gridApi.reload();
          });
        },
      },
    });
    selectSchemaGroupRef.value.open();
  },
});
defineExpose(ModalApi);
</script>
<template>
  <div>
    <Modal class="w-[60%]" title="导入">
      <Grid />
    </Modal>
    <SelectSchemaGroup ref="selectSchemaGroupRef" />
  </div>
</template>
<style lang="less" scoped></style>
