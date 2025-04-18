<script setup lang="ts">
import { NImage as Image } from 'naive-ui';

defineProps({
  value: {
    type: String,
    default: '',
  },
});
</script>
<template>
  <Image v-if="value" :src="value" :width="102" />
</template>
<style lang="less" scoped></style>
