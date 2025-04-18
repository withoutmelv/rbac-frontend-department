<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { ElMessage as message } from 'element-plus';

import { useVbenForm } from '#/adapter/form';
import {
  sysDictItemDetail,
  sysDictItemSave,
  sysDictItemUpdate,
} from '#/api/sys/dict-item';

import { formSchamas } from './schemas';

const props = defineProps({
  dictId: {
    type: [String, Number],
    default: undefined,
  },
});
const record = ref();
const isUpdate = ref(false);
const gridApi = ref();
const [DictItemForm, formApi] = useVbenForm({
  showDefaultActions: false,
  ...formSchamas,
});
const [Modal, modalApi] = useVbenModal({
  onOpenChange(isOpen) {
    isUpdate.value = modalApi.getData()?.isUpdate ?? false;
    record.value = isOpen ? modalApi.getData()?.record || {} : {};
    gridApi.value = isOpen ? modalApi.getData()?.gridApi : null;
    if (isOpen && isUpdate.value) {
      sysDictItemDetail({
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
        const submitApi = record.value?.id
          ? sysDictItemUpdate
          : sysDictItemSave;
        submitApi({
          ...values,
          dictId: props.dictId,
        })
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
  <Modal :title="isUpdate ? '编辑字典项' : '新增字典项'" class="w-[40%]">
    <div class="common-form">
      <DictItemForm />
    </div>
  </Modal>
</template>
<style scoped lang="less">
@import '#/assets/styles/common-form.less';
</style>
