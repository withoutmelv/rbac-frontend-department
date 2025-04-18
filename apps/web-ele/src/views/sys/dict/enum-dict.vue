<script lang="ts" setup>
import { reactive, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { ElCol as Col, ElRow as Row } from 'element-plus';

import {
  useVbenVxeGrid,
  type VxeGridListeners,
  type VxeGridProps,
} from '#/adapter/vxe-table';
import { customDictList, enumDictList } from '#/api/sys/dict';

const type = ref('enum');
const dataSource = ref([]);
const handlePage = (params: any) => {
  const { pageNum, pageSize } = params;
  return Promise.resolve({
    recordCount: dataSource.value.length,
    totalPage: Math.ceil(dataSource.value.length / pageSize),
    rows: dataSource.value.slice((pageNum - 1) * pageSize, pageNum * pageSize),
  });
};
const gridOptions = reactive<VxeGridProps<any>>({
  toolbarConfig: {
    enabled: false,
  },
  columns: [
    { type: 'expand', width: 80, slots: { content: 'expandedRowRender' } },
    {
      field: 'name',
      title: '字典名称',
      align: 'left',
    },
    { field: 'dictKey', title: '字典值' },
  ],
  data: [],
  border: false,
  height: '500',
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
});
const [Modal, ModalApi] = useVbenModal({
  footer: false,
  onOpenChange(isOpen) {
    type.value = isOpen ? ModalApi.getData()?.type : 'enum';
    if (isOpen) {
      const apiFun = type.value === 'enum' ? enumDictList : customDictList;
      apiFun({}).then((res) => {
        dataSource.value = res;
        gridApi.reload();
      });
    }
  },
});
defineExpose(ModalApi);
</script>
<template>
  <div>
    <Modal :title="type === 'enum' ? '枚举字典' : '自定义字典'" class="w-[60%]">
      <Grid>
        <template #expandedRowRender="{ row }">
          <template v-for="item in row.items" :key="item.dictItemKey">
            <Row
              v-if="item.dictItemKey === item.dictItemValue"
              class="m-dict-item"
            >
              <Col :span="12">{{ item.name }}</Col>
              <Col :span="12">{{ item.dictItemKey }}</Col>
            </Row>
            <Row v-else class="m-dict-item">
              <Col :span="8">{{ item.name }}</Col>
              <Col :span="8">{{ item.dictItemKey }}</Col>
              <Col :span="8">{{ item.dictItemValue }}</Col>
            </Row>
          </template>
        </template>
      </Grid>
    </Modal>
  </div>
</template>
<style lang="less" scoped>
.m-dict-item {
  padding-left: 80px;
  line-height: 36px;
}
</style>
