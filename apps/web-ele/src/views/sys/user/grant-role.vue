<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { ElMessage as message } from 'element-plus';

import { useVbenForm } from '#/adapter/form';
import { grantRole } from '#/api/sys/user';
import { useUserStore } from '@vben/stores';

const record = ref();
const gridApi = ref();
const userStore = useUserStore();
const deptId = ref(undefined);
const roleIds = ref([]);
if (!userStore.isAdmin) {
  deptId.value = userStore.userInfo?.deptId;
  roleIds.value = userStore.userInfo?.roleIds;
}
const formSchamas: VbenFormProps = {
  schema: [
    {
      fieldName: 'userId',
      label: '用户ID',
      component: 'Input',
      ifDetail: false,
      dependencies: {
        show: false,
        triggerFields: ['userId'],
      },
    },
    {
      fieldName: 'roleIdList',
      label: '选择角色',
      component: 'ApiSelect',
      componentProps: {
        placeholder: '请选择角色',
        allowClear: true,
        api: '/sys/role/select',
        multiple: true,
        params: {
          ids: roleIds.value,
          deptId: deptId.value,
          includeType: 1,
          pageNum: 1,
          pageSize: 1000,
        },
      },
      formItemClass: 'col-span-12',
    },
  ],
};
const [GrantRoleForm, formApi] = useVbenForm({
  showDefaultActions: false,
  ...formSchamas,
});
const [Modal, modalApi] = useVbenModal({
  onOpenChange(isOpen) {
    record.value = isOpen ? modalApi.getData()?.record : {};
    gridApi.value = isOpen ? modalApi.getData()?.gridApi : null;
    formApi.setValues({
      userId: record.value.id,
      roleIdList: record.value.roleIds ? record.value.roleIds.split(',') : [],
    });
  },
  onConfirm() {
    formApi.validate().then(async (e: any) => {
      if (e.valid) {
        const values = await formApi.getValues();
        modalApi.setState({ loading: true, confirmLoading: true });
        grantRole(values)
          .then(() => {
            message.success('保存成功');
            gridApi.value.reload();
            modalApi.close();
          })
          .finally(() => {
            modalApi.setState({ loading: false, confirmLoading: false });
          });
      }
    });
  },
});
defineExpose(modalApi);
</script>
<template>
  <Modal class="w-[60%]" title="授权角色">
    <GrantRoleForm />
  </Modal>
</template>
