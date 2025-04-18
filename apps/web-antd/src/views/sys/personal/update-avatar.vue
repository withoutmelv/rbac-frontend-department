<script setup lang="ts">
import type { UploadChangeParam } from 'ant-design-vue';

import { computed } from 'vue';

import { useAccessStore, useUserStore } from '@vben/stores';

import { Avatar, message, Upload } from 'ant-design-vue';

import { updateAvatar } from '#/api/sys/user';
import { Icon } from '#/components/icon';

defineProps({
  avatar: {
    type: String,
    default: '',
  },
});
const accessStore = useAccessStore();
const userStore = useUserStore();

const getAction = computed(() => {
  return `${import.meta.env.VITE_GLOB_API_URL}/sys/fileInfo/upload`;
});
const headers = {
  Authorization: `Bearer ${accessStore.accessToken}`,
};
const handleChange = (info: UploadChangeParam) => {
  // if (info.file.status !== 'uploading') {
  //   console.warn(info.file, info.fileList);
  // }

  if (info.file.status === 'done') {
    if (info.file.response.code === 99_999_999) {
      message.error(info.file.response.msg);
      return;
    }
    // 上传成功
    updateAvatar({
      avatar: info.file.response.data.url,
    }).then(() => {
      message.success('修改头像成功');
      userStore.setUserInfo({
        ...userStore.userInfo,
        avatar: info.file.response.data.fullUrl ?? info.file.response.data.url,
      } as any);
    });
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
};
</script>
<template>
  <Upload
    :action="getAction"
    :headers="headers"
    :max-count="1"
    :show-upload-list="false"
    accept="image/*"
    class="relative"
    @change="handleChange"
  >
    <Avatar :size="120" :src="avatar" />
    <div
      class="absolute left-[50%-120px] top-[0px] flex h-[120px] w-[120px] cursor-pointer justify-center rounded-full bg-black opacity-0 hover:opacity-30"
    >
      <Icon :size="48" icon="ant-design:cloud-upload-outlined" />
    </div>
  </Upload>
</template>
<style lang="less" scoped></style>
