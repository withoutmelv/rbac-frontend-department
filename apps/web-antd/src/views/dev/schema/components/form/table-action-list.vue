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
        title: '标签',
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
        field: 'component',
        title: '组件名',
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
        field: 'auth',
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
        field: 'position',
        title: '位置',
        align: 'left',
        editRender: {
          enabled: props.view !== true,
          name: 'Select',
          props: {
            size: 'middle',
            class: 'w-full',
            options: [
              {
                label: '左上角',
                value: 'leftUp',
              },
              {
                label: '左上角更多',
                value: 'leftUpMore',
              },
              {
                label: '行操作',
                value: 'action',
              },
              {
                label: '行操作更多',
                value: 'actionMore',
              },
            ],
          },
        },
      },
      {
        field: 'icon',
        title: '图标',
        width: 80,
        align: 'center',
        editRender: {
          enabled: props.view !== true,
          name: 'IconPicker',
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
    label: `按钮${dataSource.value.length + 1}`,
    component: '',
    auth: '',
    position: 'action',
    icon: 'ant-design:plus-outlined',
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
