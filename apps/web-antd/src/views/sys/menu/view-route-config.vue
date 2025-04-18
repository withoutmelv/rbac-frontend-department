<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

const record = ref();
const [Drawer, DrawerApi] = useVbenDrawer({
  footer: false,
  onOpenChange(isOpen) {
    record.value = isOpen ? DrawerApi.getData()?.record : {};
    // if (isOpen) {}
  },
});
defineExpose(DrawerApi);
</script>
<template>
  <div>
    <Drawer class="w-[60%]" title="查看路由配置">
      <pre>
        <code>{{ record }}</code>
      </pre>
    </Drawer>
  </div>
</template>
<style scoped lang="less"></style>
