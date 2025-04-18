<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import SchemaFieldIndex from '../schema-field/index.vue';

const record = ref({
  id: undefined,
});
const [Drawer, DrawerApi] = useVbenDrawer({
  onOpenChange(isOpen) {
    record.value = isOpen
      ? DrawerApi.getData()?.record
      : {
          id: undefined,
        };
  },
});
defineExpose(DrawerApi);
</script>
<template>
  <div>
    <Drawer class="w-[70%]" title="模型字段管理">
      <SchemaFieldIndex :schema-id="record.id" />
    </Drawer>
  </div>
</template>
<style lang="less" scoped></style>
