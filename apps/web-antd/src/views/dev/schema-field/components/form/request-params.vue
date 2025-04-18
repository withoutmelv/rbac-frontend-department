<script setup lang="ts">
import { computed, h, ref, watch } from 'vue';

import { useVbenVxeGrid } from '@vben/plugins/vxe-table';
import { cloneDeep } from '@vben/utils';

import { Button } from 'ant-design-vue';

import { Icon } from '#/components/icon';

defineOptions({
  inheritAttrs: false,
});
const props = defineProps({
  value: {
    type: Object,
    default: () => {},
  },
  view: {
    // 是否为查看模式
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(['update:value']);
/**
 * 对象转数组
 * @param {} obj
 */
const objToArray = (obj: any) => {
  const res: Array<any> = [];
  if (obj && Object.keys(obj).length > 0) {
    Object.keys(obj).forEach((key) => {
      res.push({
        label: key,
        value: obj[key],
      });
    });
  }
  return res;
};
/**
 * 数组转对象
 * @param {} arr
 */
const arrayToObj = (arr: Array<any>) => {
  const obj: any = {};
  if (arr && arr.length > 0) {
    arr.forEach((item: any) => {
      obj[item.label] = item.value;
    });
  }
  return obj;
};
const dataSource = computed({
  get() {
    return objToArray(props.value);
  },
  set(value) {
    emits('update:value', arrayToObj(value || {}));
  },
});
const currentRow = ref<any>({});
const currentIndex = ref(-1);
const handleChange = (value: any, params: any) => {
  currentRow.value = {
    ...params.row,
    [params.column.field]: value,
  };
  currentIndex.value = params.rowIndex;
};
const handleBlur = () => {
  const oldData = cloneDeep(dataSource.value);
  oldData[currentIndex.value] = currentRow.value;
  dataSource.value = oldData;
};
const handleRemove = (params: any) => {
  dataSource.value = dataSource.value.filter(
    (_item: any, index: number) => index !== params.rowIndex,
  );
};
const [BasicTable, gridApi] = useVbenVxeGrid({
  gridOptions: {
    size: 'mini',
    border: true,
    rowConfig: {
      useKey: true,
      drag: props.view !== true,
    },
    columnConfig: {
      useKey: true,
    },
    columns: [
      {
        field: 'label',
        title: '键',
        align: 'left',
        dragSort: props.view !== true,
        editRender: {
          enabled: props.view !== true,
          name: 'Input',
          props: {
            size: 'middle',
            onChange: handleChange,
            onBlur: handleBlur,
          },
        },
      },
      {
        field: 'value',
        title: '值',
        align: 'left',
        editRender: {
          enabled: props.view !== true,
          name: 'Input',
          props: {
            size: 'middle',
            onChange: handleChange,
            onBlur: handleBlur,
          },
        },
      },
      {
        width: 100,
        title: '操作',
        align: 'center',
        visible: props.view !== true,
        slots: {
          default: (params: any) => {
            return h(
              Button,
              {
                type: 'link',
                onClick: () => {
                  handleRemove(params);
                },
              },
              {
                default() {
                  return '删除';
                },
              },
            );
          },
        },
      },
    ],
    pagerConfig: {
      enabled: false,
    },
    editConfig: {
      trigger: 'click',
      mode: 'cell',
    },
    data: dataSource.value,
  },
  gridEvents: {
    rowDragend(params: any) {
      // 交换位置
      // 1. 先从数组中移除旧行位置的元素
      const [removed] = dataSource.value.splice(params._index.oldIndex, 1);
      // 2. 然后将移除的元素插入到新行位置
      dataSource.value.splice(params._index.newIndex, 0, removed);
      dataSource.value = [...dataSource.value];
    },
  },
});

const handleAdd = () => {
  dataSource.value = [
    ...dataSource.value,
    {
      label: `key${dataSource.value.length + 1}`,
      value: '',
    },
  ];
};
watch(
  () => dataSource.value,
  () => {
    gridApi.setState({
      gridOptions: {
        data: dataSource.value,
      },
    });
  },
  {
    deep: true,
  },
);
</script>
<template>
  <BasicTable class="w-full">
    <template v-if="view !== true" #empty>
      <Button
        class="mt-2 w-full"
        size="middle"
        type="primary"
        @click="handleAdd"
      >
        <Icon icon="ant-design:plus-outlined" />
      </Button>
    </template>
    <template v-if="view !== true" #bottom>
      <Button
        v-if="dataSource.length > 0"
        class="mt-2 w-full"
        size="middle"
        type="primary"
        @click="handleAdd"
      >
        <Icon icon="ant-design:plus-outlined" />
      </Button>
    </template>
  </BasicTable>
</template>
