<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { ElMessage as message } from 'element-plus';

import { type VbenFormProps } from '#/adapter/form';
import {
  useVbenVxeGrid,
  type VxeGridListeners,
  type VxeGridProps,
} from '#/adapter/vxe-table';
import { saveUserRole, userListExcludeRoleId } from '#/api/sys/rbac';

const record = ref();
const hasTopTableDropDownActions = ref(false);
const parentGridApi = ref();
const formOptions: VbenFormProps = {
  collapsed: true,
  commonConfig: {
    labelWidth: 60,
  },
  schema: [
    {
      component: 'Input',
      fieldName: 'm_LIKE_userName',
      label: '用户名',
      componentProps: {
        placeholder: '请输入用户名',
        allowClear: true,
      },
    },
    {
      component: 'Input',
      fieldName: 'm_LIKE_realName',
      label: '姓名',
      componentProps: {
        placeholder: '请输入姓名',
        allowClear: true,
      },
    },
    {
      component: 'Input',
      fieldName: 'm_LIKE_mobilePhone',
      label: '手机号码',
      componentProps: {
        placeholder: '请输入手机号码',
        allowClear: true,
      },
    },
  ],
};
const gridOptions: VxeGridProps<any> = {
  columns: [
    { type: 'checkbox', width: 60 },
    { field: 'userName', title: '用户名' },
    { field: 'realName', title: '姓名' },
    { field: 'mobilePhone', title: '手机号码' },
  ],
  toolbarConfig: {
    refresh: true, // 刷新
    print: false, // 打印
    export: false, // 导出
    // custom: true, // 自定义列
    zoom: true, // 最大化最小化
    slots: {},
    custom: {
      // 自定义列-图标
      icon: 'vxe-icon-menu',
    },
  },
  border: false,
  height: '500',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await userListExcludeRoleId({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
          roleId: record.value.id,
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

const [Modal, ModalApi] = useVbenModal({
  onOpenChange(isOpen) {
    record.value = isOpen ? ModalApi.getData()?.record || {} : {};
    parentGridApi.value = isOpen ? ModalApi.getData()?.gridApi : null;
  },
  onConfirm() {
    const checkedKeys = gridApi.grid
      .getCheckboxRecords()
      .map((item) => item.id);
    const userRole = checkedKeys.map((item) => {
      return {
        userId: item,
        roleId: record.value.id,
      };
    });
    saveUserRole(userRole).then(() => {
      message.success('添加成功');
      gridApi.reload();
      parentGridApi.value.reload();
    });
  },
});
defineExpose(ModalApi);
</script>
<template>
  <div>
    <Modal class="w-[60%]" title="添加用户">
      <Grid>
        <template #toolbar-tools></template>
      </Grid>
    </Modal>
  </div>
</template>
