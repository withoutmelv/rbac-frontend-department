<script lang="ts" setup>
import { computed, onMounted, type PropType, ref, watch } from 'vue';

import { useAccess } from '@vben/access';
import { cloneDeep } from '@vben/utils';

import { Button, Card, message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  devSchemaDetail,
  updateListKeys,
  updateSearchFormKeys,
} from '#/api/dev/schema';

const props = defineProps({
  schemaId: {
    type: [String, Number],
    default: undefined,
  },
  type: {
    type: String as PropType<'listKeys' | 'searchFormKeys'>,
    default: 'searchFormKeys',
  },
});
// 判断是否有拖拽权限
const canRowDrag = computed(() => {
  const { hasAccessByCodes } = useAccess();
  if (props.type === 'searchFormKeys') {
    return hasAccessByCodes(['admin', 'dev:schema:updateSearchFormKeys']);
  }
  return hasAccessByCodes(['admin', 'dev:schema:updateListKeys']);
});
const dataSource = ref([]);
const handlePage = (params: any) => {
  const { pageNum, pageSize } = params;
  return Promise.resolve({
    recordCount: dataSource.value.length,
    totalPage: Math.ceil(dataSource.value.length / pageSize),
    rows: dataSource.value.slice((pageNum - 1) * pageSize, pageNum * pageSize),
  });
};
const [SearchFormKeysTable, gridApi] = useVbenVxeGrid({
  gridOptions: {
    rowConfig: {
      useKey: true,
      drag: canRowDrag.value,
    },
    height: 500,
    columns: [
      {
        field: 'fieldName',
        title: '列名',
        align: 'left',
        dragSort: canRowDrag.value,
      },
      {
        field: 'remark',
        title: '注释',
        align: 'left',
      },
    ],
    pagerConfig: {
      pageSize: 10,
    },
    proxyConfig: {
      ajax: {
        query: async ({ page }: any, formValues: any) => {
          return await handlePage({
            pageNum: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
    },
  },
  gridEvents: {
    rowDragend(params: any) {
      // 交换位置
      // 1. 先从数组中移除旧行位置的元素
      const [removed] = dataSource.value.splice(params._index.oldIndex, 1);
      // 2. 然后将移除的元素插入到新行位置
      dataSource.value.splice(params._index.newIndex, 0, removed as never);
      dataSource.value = [...dataSource.value];
      const keys = dataSource.value
        .map((item: any) => item.fieldName)
        .join(',');
      // eslint-disable-next-line no-use-before-define
      handleSubmit(keys);
    },
  },
});
const requestData = () => {
  if (!props.schemaId) return;
  devSchemaDetail({
    id: props.schemaId,
  }).then((data: any) => {
    const cloneData = cloneDeep(data);
    dataSource.value =
      props.type === 'searchFormKeys'
        ? cloneData?.columns
            ?.filter((column: any) => {
              return column?.ext?.search && column?.ext?.searchType;
            })
            ?.sort((a: any, b: any) => {
              if (a.searchSort === b.searchSort) {
                return Number(a.id) - Number(b.id);
              }
              return a.searchSort - b.searchSort;
            }) || []
        : cloneData?.columns
            ?.filter((column: any) => {
              return !column?.ext?.listHide;
            })
            ?.sort((a: any, b: any) => {
              if (a.listSort === b.listSort) {
                return Number(a.id) - Number(b.id);
              }
              return a.listSort - b.listSort;
            }) || [];
    gridApi.reload();
  });
};
const handleSubmit = (keys: string) => {
  const apiFun: any =
    props.type === 'searchFormKeys' ? updateSearchFormKeys : updateListKeys;
  const key = props.type === 'searchFormKeys' ? 'searchFormKeys' : 'listKeys';
  apiFun({
    id: props.schemaId,
    [key]: keys,
  }).then(() => {
    message.success('更新成功');
    requestData();
  });
};
onMounted(() => {
  requestData();
});
watch(
  () => props.schemaId,
  () => {
    requestData();
  },
);
const handleReset = () => {
  handleSubmit('');
};
</script>
<template>
  <Card>
    <template #title>调整搜索表单字段排序</template>
    <template #extra>
      <div v-if="canRowDrag">
        <Button size="small" type="link" @click="handleReset"> 重置 </Button>
      </div>
    </template>
    <SearchFormKeysTable />
  </Card>
</template>
