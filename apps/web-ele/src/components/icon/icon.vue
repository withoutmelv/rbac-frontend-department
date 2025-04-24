<script setup lang="ts">

import { ElIcon } from 'element-plus';

const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <ElIcon>
     <component :is="props.icon"></component>
  </ElIcon>
</template>
