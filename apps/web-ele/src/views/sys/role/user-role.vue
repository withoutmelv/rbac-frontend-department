<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { ElButton as Button, ElMessage as message } from 'element-plus';

import { type VbenFormProps } from '#/adapter/form';
import {
  useVbenVxeGrid,
  type VxeGridListeners,
  type VxeGridProps,
} from '#/adapter/vxe-table';
import { removeUserRole, userListByRoleId } from '#/api/sys/rbac';
import { Icon } from '#/components/icon';
import { TableAction } from '#/components/table-action';

import AddUser from './add-user.vue';

const record = ref();
const hasTopTableDropDownActions = ref(false);
const addUserRef = ref();
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
    {
      width: 160,
      title: '操作',
      align: 'center',
      slots: { default: 'ACTION' },
      fixed: 'right',
    },
  ],
  toolbarConfig: {
    refresh: true, // 刷新
    print: false, // 打印
    export: false, // 导出
    // custom: true, // 自定义列
    zoom: true, // 最大化最小化
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
        return await userListByRoleId({
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

const [Drawer, DrawerApi] = useVbenDrawer({
  footer: false,
  onOpenChange(isOpen) {
    record.value = isOpen ? DrawerApi.getData()?.record : {};
  },
});
// 添加成员
const handleAdd = () => {
  addUserRef.value.setData({
    record: record.value,
    gridApi,
  });
  addUserRef.value.open();
};
// 删除用户角色关系
const handleRemoveUserRole = (row: any) => {
  let ids = [];
  if (row) {
    ids.push(row.id);
  } else {
    ids = gridApi.grid.getCheckboxRecords().map((item) => item.id);
  }
  const userRoles = ids.map((id) => {
    return {
      userId: id,
      roleId: record.value.id,
    };
  });
  removeUserRole(userRoles).then(() => {
    message.success('删除成功');
    gridApi.reload();
  });
};
defineExpose(DrawerApi);
</script>
<template>
  <div>
    <Drawer class="w-[60%]" title="成员管理">
      <Grid>
        <template #toolbar-buttons>
          <TableAction
            :actions="[
              {
                label: '添加用户',
                type: 'primary',
                icon: 'ep:plus',
                auth: ['admin', 'sys:rbac:saveUserRole'],
                onClick: handleAdd.bind(null),
              },
            ]"
            :drop-down-actions="[
              {
                label: '移除用户',
                icon: 'ep:delete',
                ifShow: hasTopTableDropDownActions,
                auth: ['admin', 'sys:rbac:removeUserRole'],
                popConfirm: {
                  title: '确定移除用户吗？',
                  confirm: handleRemoveUserRole.bind(null, false),
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
        <template #ACTION="{ row }">
          <TableAction
            :actions="[
              {
                label: '移除用户',
                type: 'primary',
                link: true,
                icon: 'ep:delete',
                size: 'small',
                auth: ['admin', 'sys:rbac:removeUserRole'],
                popConfirm: {
                  title: '确定移除用户吗？',
                  confirm: handleRemoveUserRole.bind(null, row),
                },
              },
            ]"
          />
        </template>
        <template #toolbar-tools></template>
      </Grid>
    </Drawer>
    <AddUser ref="addUserRef" />
  </div>
</template>
