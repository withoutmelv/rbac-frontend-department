<script setup lang="ts">
import { ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import DictItemIndex from '../dict-item/index.vue';

const record = ref();
const [Drawer, DrawerApi] = useVbenDrawer({
  onOpenChange(isOpen) {
    record.value = isOpen ? DrawerApi.getData()?.record : {};
  },
});
defineExpose(DrawerApi);
</script>
<template>
  <Drawer :footer="false" class="w-[60%]" title="字典项管理">
    <DictItemIndex v-if="record.id" :dict-id="record.id" />
  </Drawer>
</template>
<style lang="less" scoped></style>
