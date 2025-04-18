<script setup lang="ts">
import { computed } from 'vue';

import { NFloatButton as FloatButton, NBadge } from 'naive-ui';

const handleClick = () => {
  window.open(import.meta.env.VITE_BILIBILI_COURSE);
};
const showAd = computed(() => {
  return (
    import.meta.env.VITE_SHOW_BILIBILI_COURSE === 'true' &&
    import.meta.env.VITE_BILIBILI_COURSE
  );
});
</script>
<template>
  <div v-if="showAd">
    <FloatButton
      :badge="{ count: 1, dot: true }"
      :bottom="60"
      left="50%"
      shape="square"
      @click="handleClick"
    >
      <NBadge :offset="[18, -4]" dot />
      <template #description> 视频课程 </template>
    </FloatButton>
  </div>
</template>
<style lang="less" scoped></style>
