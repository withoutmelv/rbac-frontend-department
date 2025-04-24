<script setup lang="ts">
import { IconifyIcon as VbenIcon } from '@vben/icons';

import { ElIcon } from 'element-plus';

const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
});
console.log("-----------", props.icon)
</script>

<template>
  <ElIcon>
     <component :is="props.icon"></component>
  </ElIcon>
</template>
