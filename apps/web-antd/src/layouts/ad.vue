<script setup lang="ts">
import { computed } from 'vue';

import { FloatButton } from 'ant-design-vue';

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
      :style="{
        bottom: '60px',
        left: '50%',
      }"
      description="视频课程"
      shape="square"
      @click="handleClick"
    />
  </div>
</template>
<style lang="less" scoped></style>
