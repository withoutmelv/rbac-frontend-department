<script setup lang="ts">
import { computed } from 'vue';

import { useAccessStore, useUserStore } from '@vben/stores';

import {
  ElAvatar as Avatar,
  ElMessage as message,
  ElUpload as Upload,
} from 'element-plus';

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
const handleChange = (info: any) => {
  if (info.code === 99_999_999) {
    message.error(info.msg);
    return;
  }
  // 上传成功
  updateAvatar({
    avatar: info.data.url,
  }).then(() => {
    message.success('修改头像成功');
    userStore.setUserInfo({
      ...userStore.userInfo,
      avatar: info.data.fullUrl ?? info.data.url,
    } as any);
  });
};
</script>
<template>
  <Upload
    :action="getAction"
    :headers="headers"
    :show-file-list="false"
    accept="image/*"
    class="relative"
    @success="handleChange"
  >
    <Avatar :size="120" :src="avatar" />
    <div
      class="absolute left-[50%-120px] top-[0px] flex h-[120px] w-[120px] cursor-pointer justify-center rounded-full bg-black opacity-0 hover:opacity-30"
    >
      <Icon
        :size="48"
        class="mt-[36px]"
        icon="ant-design:cloud-upload-outlined"
      />
    </div>
  </Upload>
</template>
<style lang="less" scoped></style>
