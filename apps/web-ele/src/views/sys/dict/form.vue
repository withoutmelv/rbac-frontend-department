<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { ElMessage as message } from 'element-plus';

import { useVbenForm } from '#/adapter/form';
import { sysDictDetail, sysDictSave, sysDictUpdate } from '#/api/sys/dict';

import { formSchamas } from './schemas';

const record = ref();
const isUpdate = ref(false);
const gridApi = ref();
const [DictForm, formApi] = useVbenForm({
  showDefaultActions: false,
  ...formSchamas,
});
const [Modal, modalApi] = useVbenModal({
  onOpenChange(isOpen) {
    isUpdate.value = modalApi.getData()?.isUpdate ?? false;
    record.value = isOpen ? modalApi.getData()?.record || {} : {};
    gridApi.value = isOpen ? modalApi.getData()?.gridApi : null;
    if (isOpen && isUpdate.value) {
      sysDictDetail({
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
        const submitApi = record.value?.id ? sysDictUpdate : sysDictSave;
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
  <Modal :title="isUpdate ? '编辑字典' : '新增字典'" class="w-[40%]">
    <div class="common-form">
      <DictForm />
    </div>
  </Modal>
</template>
<style scoped lang="less">
@import '#/assets/styles/common-form.less';
</style>
