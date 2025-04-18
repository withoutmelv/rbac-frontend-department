<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { ElMessage as message } from 'element-plus';

import { useVbenForm } from '#/adapter/form';
import { sysPostDetail, sysPostSave, sysPostUpdate } from '#/api/sys/post';

import { formSchamas } from './schemas';

const record = ref();
const isUpdate = ref(false);
const gridApi = ref();
const [PostForm, formApi] = useVbenForm({
  showDefaultActions: false,
  ...formSchamas,
});
const [Modal, modalApi] = useVbenModal({
  onOpenChange(isOpen) {
    isUpdate.value = modalApi.getData()?.isUpdate ?? false;
    record.value = isOpen ? modalApi.getData()?.record || {} : {};
    gridApi.value = isOpen ? modalApi.getData()?.gridApi : null;
    if (isOpen && isUpdate.value) {
      sysPostDetail({
        id: record.value?.id,
      }).then((data) => {
        formApi.setValues(data);
      });
    } else {
      formApi.setValues(record.value);
    }
  },
  onConfirm() {
    formApi.validate().then(async (e: any) => {
      if (e.valid) {
        const values = await formApi.getValues();
        modalApi.setState({ loading: true, confirmLoading: true });
        const submitApi = record.value?.id ? sysPostUpdate : sysPostSave;
        submitApi(values)
          .then(() => {
            message.success('保存成功');
            gridApi.value?.reload();
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
  <Modal :title="isUpdate ? '编辑岗位' : '新增岗位'" class="w-[40%]">
    <div class="common-form">
      <PostForm />
    </div>
  </Modal>
</template>
<style scoped lang="less">
@import '#/assets/styles/common-form.less';
</style>
