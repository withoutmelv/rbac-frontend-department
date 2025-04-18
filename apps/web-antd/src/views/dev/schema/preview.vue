<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { TabPane, Tabs } from 'ant-design-vue';

import DynamicSchemaForm from '#/components/dynamic-schema-form/dynamic-schema-form.vue';

const record = ref({
  id: undefined,
  tableName: '',
});
const [Drawer, DrawerApi] = useVbenDrawer({
  footer: false,
  onOpenChange(isOpen) {
    record.value = isOpen
      ? DrawerApi.getData()?.record
      : {
          id: undefined,
          tableName: '',
        };
  },
});
defineExpose(DrawerApi);
</script>
<template>
  <div>
    <Drawer class="w-[70%]" title="预览表单">
      <Tabs>
        <TabPane key="form" tab="表单">
          <DynamicSchemaForm :table-name="record.tableName" />
        </TabPane>
        <TabPane key="detail" tab="详情">
          <DynamicSchemaForm :table-name="record.tableName" :view="true" />
        </TabPane>
      </Tabs>
    </Drawer>
  </div>
</template>
<style scoped lang="less">
@import '#/assets/styles/common-form.less';
@import '#/assets/styles/common-detail.less';
</style>
