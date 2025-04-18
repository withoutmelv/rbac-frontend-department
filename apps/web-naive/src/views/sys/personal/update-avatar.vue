<script setup lang="ts">
import { computed } from 'vue';

import { useAccessStore, useUserStore } from '@vben/stores';

import { NAvatar as Avatar, NUpload as Upload, useMessage } from 'naive-ui';

import { updateAvatar } from '#/api/sys/user';
import { Icon } from '#/components/icon';

defineProps({
  avatar: {
    type: String,
    default: '',
  },
});

const message = useMessage();

const accessStore = useAccessStore();
const userStore = useUserStore();

const getAction = computed(() => {
  return `${import.meta.env.VITE_GLOB_API_URL}/sys/fileInfo/upload`;
});
const headers = {
  Authorization: `Bearer ${accessStore.accessToken}`,
};
const handleChange = ({ event }: any) => {
  if ((event?.target as XMLHttpRequest).response.code === 99_999_999) {
    message.error((event?.target as XMLHttpRequest).response.msg);
    return;
  }
  // 上传成功
  updateAvatar({
    avatar: (event?.target as XMLHttpRequest).response.data.url,
  }).then(() => {
    message.success('修改头像成功');
    userStore.setUserInfo({
      ...userStore.userInfo,
      avatar:
        (event?.target as XMLHttpRequest).response.data.fullUrl ??
        (event?.target as XMLHttpRequest).response.data.url,
    } as any);
  });
};
</script>
<template>
  <Upload
    :action="getAction"
    :headers="headers"
    :max-count="1"
    :show-file-list="false"
    accept="image/*"
    class="relative w-[120px]"
    response-type="json"
    @finish="handleChange"
  >
    <Avatar :round="true" :size="120" :src="avatar" />
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
