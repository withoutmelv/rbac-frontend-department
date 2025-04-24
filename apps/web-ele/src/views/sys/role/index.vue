<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridListeners, VxeGridProps } from '#/adapter/vxe-table';

import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { ElButton as Button, ElMessage as message } from 'element-plus';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { sysRolePage, sysRoleRemove } from '#/api/sys/role';
import { Icon } from '#/components/icon';
import { TableAction } from '#/components/table-action';

import AuthMenu from './auth-menu.vue';
import AuthRoleKnowledge from './auth-role-knowledge.vue';
import DetailForm from './detail.vue';
import RoleForm from './form.vue';
import { gridSchemas, searchFormSchemas } from './schemas';
import UserRole from './user-role.vue';

import { useUserStore } from '@vben/stores';

const hasTopTableDropDownActions = ref(false);
const roleFormRef = ref();
const detailFormRef = ref();
const authMenuRef = ref();
const authRoleKnowledgeRef = ref();
const userRoleRef = ref();
const refreshKey = ref(new Date().getTime());
const userStore = useUserStore();
const currentFormValues = ref({}); // 存储当前表单的值

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
        return await sysRolePage({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          deptId: userStore.userInfo?.deptId,
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
  roleFormRef.value.setData({
    isUpdate: false,
    gridApi,
  });
  roleFormRef.value.open();
};
// 打开编辑表单
const handleEdit = (record: any) => {
  roleFormRef.value.setData({
    record,
    isUpdate: true,
    gridApi,
  });
  roleFormRef.value.open();
};
// 打开详情
const handleDetail = (record: any) => {
  detailFormRef.value.setData({
    record,
  });
  detailFormRef.value.open();
};
// 删除
const handleDelete = (row: any) => {
  let ids = [];
  if (row) {
    ids.push(row.id);
  } else {
    ids = gridApi.grid.getCheckboxRecords().map((item) => item.id);
  }
  sysRoleRemove({ ids }).then(() => {
    message.success('删除成功');
    (gridApi as any).reloadTable();
  });
};
// 授权菜单
const handleAuthMenu = (record: any) => {
  authMenuRef.value.setData({
    record,
  });
  authMenuRef.value.open();
};
// 知识库授权
const handleRoleKnowledge = (record: any) => {
  authRoleKnowledgeRef.value.setData({
    record,
  });
  authRoleKnowledgeRef.value.open();
};
// 成员管理
const handleUserRole = (record: any) => {
  userRoleRef.value.setData({
    record,
  });
  userRoleRef.value.open();
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
              auth: ['admin', 'sys:role:save'],
              onClick: handleAdd.bind(null),
            },
          ]"
          :drop-down-actions="[
            {
              label: '删除',
              icon: 'Delete',
              ifShow: hasTopTableDropDownActions,
              auth: ['admin', 'sys:role:remove'],
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
              <Icon icon="ArrowDown" />
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
              auth: ['admin', 'sys:role:detail'],
              onClick: handleDetail.bind(null, row),
            },
            {
              label: '授权菜单',
              type: 'primary',
              link: true,
              size: 'small',
              auth: ['admin', 'sys:rbac:saveRoleMenu'],
              onClick: handleAuthMenu.bind(null, row),
            },
            {
              label: '知识库授权',
              type: 'primary',
              link: true,
              size: 'small',
              auth: ['admin', 'sys:rbac:saveRoleKnowledge'],
              onClick: handleRoleKnowledge.bind(null, row),
            },
            {
              label: '成员管理',
              type: 'primary',
              link: true,
              size: 'small',
              auth: ['admin', 'sys:rbac:userListByRoleId'],
              onClick: handleUserRole.bind(null, row),
            },
          ]"
          :drop-down-actions="[
            {
              label: '编辑',
              icon: 'Edit',
              type: 'primary',
              link: true,
              size: 'small',
              auth: ['admin', 'sys:role:update'],
              onClick: handleEdit.bind(null, row),
            },
            {
              label: '删除',
              icon: 'Delete',
              auth: ['admin', 'sys:role:remove'],
              popConfirm: {
                title: '确定删除吗？',
                confirm: handleDelete.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </Grid>
    <RoleForm ref="roleFormRef" />
    <DetailForm ref="detailFormRef" />
    <AuthMenu ref="authMenuRef" />
    <AuthRoleKnowledge ref="authRoleKnowledgeRef" />
    <UserRole ref="userRoleRef" />
  </Page>
</template>
