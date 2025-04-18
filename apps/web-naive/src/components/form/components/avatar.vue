<script setup lang="ts">
import { ref, watch } from 'vue';

import { useVModel } from '@vueuse/core';
import { NUpload as Upload } from 'naive-ui';

import { uploadFile } from '#/api/sys/file-info';
import { Icon } from '#/components/icon';

defineOptions({
  inheritAttrs: false,
});
const props = defineProps({
  value: {
    type: String,
    default: '',
  },
});
const emits = defineEmits(['update:value']);
const mValue = useVModel(props, 'value', emits, {
  defaultValue: props.value,
  passive: true,
});
const fileList = ref<any>(
  props.value
    ? [
        {
          name: props.value,
          url: props.value,
          status: 'finishd',
          type: 'image/*',
        },
      ]
    : [],
);
watch(
  () => props.value,
  (val) => {
    if (val) {
      fileList.value = [
        {
          name: val,
          url: val,
          status: 'finished',
          type: 'image/*',
        },
      ];
    }
  },
);
const customRequest = (e: any) => {
  uploadFile({
    file: e.file,
  }).then((data: any) => {
    mValue.value = data.fullUrl;
  });
};
const handleRemove = () => {
  mValue.value = '';
};
</script>
<template>
  <Upload
    v-model:file-list="fileList"
    :custom-request="customRequest"
    :max="1"
    :show-upload-list="false"
    list-type="image-card"
    @remove="handleRemove"
  >
    <Icon :size="24" icon="ant-design:plus-outlined" />
  </Upload>
</template>
<style lang="less" scoped>
.m-avatar-wrap {
  position: relative;
  height: 102px;
  .m-avatar-icon-delete {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }
}
</style>
