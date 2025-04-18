<script setup lang="ts">
import { computed, h, watch } from 'vue';

import { useVbenVxeGrid } from '@vben/plugins/vxe-table';

import { Button } from 'ant-design-vue';

import { TableAction } from '#/components/table-action';

defineOptions({
  inheritAttrs: false,
});
const props = defineProps({
  value: {
    type: Array,
    default: () => [],
  },
  view: {
    // 是否为查看模式
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(['update:value']);
const dataSource = computed({
  get() {
    return props.value || [];
  },
  set(value) {
    emits('update:value', value || []);
  },
});
const handleRemove = (params: any) => {
  // eslint-disable-next-line no-use-before-define
  gridApi.grid.remove(params.row);
};
const [BasicTable, gridApi] = useVbenVxeGrid({
  gridOptions: {
    size: 'mini',
    border: true,
    toolbarConfig: {
      slots: {
        buttons: 'toolbar-buttons',
      },
    },
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
        title: '权限名',
        align: 'left',
        dragSort: props.view !== true,
        editRender: {
          enabled: props.view !== true,
          name: 'Input',
          props: {
            size: 'middle',
          },
        },
      },
      {
        field: 'value',
        title: '权限码(sys:role:xx)',
        align: 'left',
        editRender: {
          enabled: props.view !== true,
          name: 'Input',
          props: {
            size: 'middle',
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
      mode: 'row',
    },
    data: dataSource.value,
  },
  gridEvents: {},
});

const handleAdd = async () => {
  const record = {
    label: `权限码${dataSource.value.length + 1}`,
    value: '',
  };
  const { row: newRow } = await gridApi.grid.insertAt(record, -1);
  gridApi.grid.setEditRow(newRow);
};
const handleSave = () => {
  dataSource.value = gridApi.grid.getTableData().fullData;
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
    <template #toolbar-buttons>
      <TableAction
        :actions="[
          {
            label: '新增',
            size: 'small',
            icon: 'ant-design:plus-outlined',
            onClick: handleAdd,
            ifShow: view !== true,
          },
          {
            label: '保存',
            icon: 'ant-design:save-outlined',
            size: 'small',
            onClick: handleSave,
            ifShow: view !== true,
          },
        ]"
      />
    </template>
    <template #toolbar-tools></template>
  </BasicTable>
</template>
