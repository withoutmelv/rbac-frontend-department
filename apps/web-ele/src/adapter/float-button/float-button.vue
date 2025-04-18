<script setup lang="ts">
import { ElBadge, ElButton } from 'element-plus';

defineProps({
  description: {
    type: String,
    default: undefined,
  },
  badge: {
    type: Object,
    default() {
      return {};
    },
  },
});
</script>

<template>
  <div class="float-button-container">
    <ElBadge v-if="Object.keys(badge).length > 0" v-bind="badge">
      <ElButton circle>
        <slot name="icon"></slot>
        {{ description }}
      </ElButton>
    </ElBadge>
    <ElButton v-else circle icon="el-icon-plus">
      <slot name="icon"></slot>
      {{ description }}
    </ElButton>
  </div>
</template>

<style scoped>
.float-button-container {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 1000; /* 确保浮动按钮在其他内容之上 */
}

/* 可选：自定义按钮样式 */
.float-button-container .el-button {
  width: 64px;
  height: 64px;
  padding: 0;
  font-size: 12px;
  text-align: center;
}
</style>
