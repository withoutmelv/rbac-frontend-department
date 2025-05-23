<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridListeners, VxeGridProps } from '#/adapter/vxe-table';

import { ref } from 'vue';

import { useAccess } from '@vben/access';
import { Page } from '@vben/common-ui';
import { useTabs } from '@vben/hooks';
import { useAccessStore, useUserStore } from '@vben/stores';

import { ElButton as Button, ElMessage as message } from 'element-plus';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  locked,
  playUser,
  resetPassword,
  sysUserPage,
  sysUserRemove,
  unLocked,
  findUserByRoleIds
} from '#/api/sys/user';
import { Icon } from '#/components/icon';
import { TableAction } from '#/components/table-action';

import DetailForm from './detail.vue';
import UserForm from './form.vue';
import GrantRole from './grant-role.vue';
import { gridSchemas, searchFormSchemas } from './schemas';

const { hasAccessByCodes } = useAccess();
const userStore = useUserStore();

const accessStore = useAccessStore();
const hasTopTableDropDownActions = ref(false);
const userFormRef = ref();
const detailFormRef = ref();
const grantRoleRef = ref();
const refreshKey= ref(new Date().getTime());
const currentFormValues = ref({}); // 存储当前表单的值
const firstLoad = ref(true);
const sameRoleUserList = ref([]);

const formOptions: VbenFormProps = {
  ...searchFormSchemas,
  collapsed: true,
  handleSubmit: (values) => {
    currentFormValues.value = values;
    (gridApi as any).reloadTable();
  },
  handleReset: () => {
    currentFormValues.value = {};
    (gridApi as any).reloadTable();
  }
};

const getSameRoleUserList = async (params: any) => {
  firstLoad.value = false;
  const res = await findUserByRoleIds(params);
  sameRoleUserList.value = res.map((item: {id: string}) => item.id);
}

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
      query: async ({ page }) => {
        gridApi.formApi.setValues(currentFormValues.value)
        const formValues = currentFormValues.value;
        firstLoad.value && await getSameRoleUserList({
          roleIds: userStore.userInfo?.roleIds,
        });
        return await sysUserPage({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          deptId: userStore.userInfo?.deptId,
          ids: sameRoleUserList.value,
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

const reloadTable = () => {
  refreshKey.value = new Date().getTime();
  gridApi.reload();
};

// 使用类型断言解决类型报错问题
(gridApi as any).reloadTable = reloadTable;

// 打开新增表单
const handleAdd = () => {
  userFormRef.value.setData({
    isUpdate: false,
    gridApi,
  });
  userFormRef.value.open();
};
// 打开编辑表单
const handleEdit = (record: any) => {
  userFormRef.value.setData({
    record,
    isUpdate: true,
    gridApi,
  });
  userFormRef.value.open();
};
// 打开详情
const handleDetail = (record: any) => {
  detailFormRef.value.setData({
    record,
  });
  detailFormRef.value.open();
};
// 打开授权角色
const handleGrantRole = (record: any) => {
  grantRoleRef.value.setData({
    record,
    gridApi,
  });
  grantRoleRef.value.open();
};
// 重置密码
const handleResetPassword = (row: any) => {
  let ids = [];
  if (row) {
    ids.push(row.id);
  } else {
    ids = gridApi.grid.getCheckboxRecords().map((item) => item.id);
  }
  resetPassword({ ids }).then(() => {
    message.success('重置密码成功');
    (gridApi as any).reloadTable();
  });
};
// 扮演用户
const handlePlayUser = (row: any) => {
  playUser({
    userId: row.id,
  }).then((data) => {
    accessStore.setAccessToken(data.token);
    accessStore.setRefreshToken(data.refreshToken);
    message.success('用户扮演成功！');
    const { closeCurrentTab } = useTabs();
    closeCurrentTab();
    setTimeout(() => {
      location.reload();
    }, 600);
  });
};
// 锁定用户
const handleLocked = (record: any) => {
  const ids = [];
  if (record && record.id) {
    ids.push(record.id);
  }
  locked({
    ids,
  }).then(() => {
    message.success('锁定用户成功');
    (gridApi as any).reloadTable();
  });
};
// 取消锁定用户
const handleUnLocked = (record: any) => {
  const ids = [];
  if (record && record.id) {
    ids.push(record.id);
  }
  unLocked({
    ids,
  }).then(() => {
    message.success('取消锁定用户成功');
    (gridApi as any).reloadTable();
  });
};

// 删除
const handleDelete = (row: any) => {
  let ids = [];
  if (row) {
    ids.push(row.id);
  } else {
    ids = gridApi.grid.getCheckboxRecords().map((item) => item.id);
  }
  sysUserRemove({ ids }).then(() => {
    message.success('删除成功');
    (gridApi as any).reloadTable();
  });
};
</script>

<template>
  <Page auto-content-height>
    <Grid :key="refreshKey">
      <template #toolbar-buttons>
        <TableAction
          :actions="[
            {
              label: '新增',
              type: 'primary',
              icon: 'Plus',
              auth: ['admin', 'sys:user:save'],
              onClick: handleAdd.bind(null),
            },
          ]"
          :drop-down-actions="[
            {
              label: '重置密码',
              icon: 'Setting',
              ifShow: hasTopTableDropDownActions,
              auth: ['admin', 'sys:user:resetPassword'],
              popConfirm: {
                title: `是否重置该用户密码？`,
                confirm: handleResetPassword.bind(null),
              },
            },
            {
              label: '删除',
              icon: 'Delete',
              ifShow: hasTopTableDropDownActions,
              auth: ['admin', 'sys:user:remove'],
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
              <Icon icon="el:arrow-down" />
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
              auth: ['admin', 'sys:user:detail'],
              onClick: handleDetail.bind(null, row),
            },
            {
              label: '编辑',
              type: 'primary',
              link: true,
              size: 'small',
              auth: ['admin', 'sys:user:update'],
              onClick: handleEdit.bind(null, row),
            },
          ]"
          :drop-down-actions="[
            // {
            //   label: '扮演用户',
            //   icon: 'VideoPlay',
            //   auth: ['admin', 'sys:playUser'],
            //   popConfirm: {
            //     title: `是否扮演该用户？`,
            //     confirm: handlePlayUser.bind(null, row),
            //   },
            // },
            {
              label: '重置密码',
              icon: 'Setting',
              auth: ['admin', 'sys:user:resetPassword'],
              popConfirm: {
                title: `是否重置该用户密码？`,
                confirm: handleResetPassword.bind(null, row),
              },
            },
            {
              label: '授权角色',
              icon: 'User',
              auth: ['admin', 'sys:user:grantRole'],
              onClick: handleGrantRole.bind(null, row),
            },
            {
              label: '锁定用户',
              icon: 'Lock',
              auth: ['admin', 'sys:user:locked'],
              popConfirm: {
                title: `是否锁定该用户？`,
                confirm: handleLocked.bind(null, row),
              },
              ifShow() {
                return (
                  hasAccessByCodes(['admin', 'sys:user:locked']) &&
                  row.isLocked === 0
                );
              },
              disabled: userStore.$state.userInfo?.id === row.id,
            },
            {
              label: '取消锁定',
              icon: 'Unlock',
              auth: ['admin', 'sys:user:unLocked'],
              popConfirm: {
                title: `是否取消锁定该用户？`,
                confirm: handleUnLocked.bind(null, row),
              },
              ifShow() {
                return (
                  hasAccessByCodes(['admin', 'sys:user:unLocked']) &&
                  row.isLocked === 1
                );
              },
              disabled: userStore.$state.userInfo?.id === row.id,
            },
            {
              label: '删除',
              icon: 'Delete',
              auth: ['admin', 'sys:user:remove'],
              popConfirm: {
                title: '确定删除吗？',
                confirm: handleDelete.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </Grid>
    <UserForm ref="userFormRef" />
    <DetailForm ref="detailFormRef" />
    <GrantRole ref="grantRoleRef" />
  </Page>
</template>
