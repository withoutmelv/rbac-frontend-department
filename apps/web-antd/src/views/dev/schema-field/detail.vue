<script lang="ts" setup>
import type { DescItem } from '#/components/description';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { devSchemaFieldDetail } from '#/api/dev/schema-field';
import { Description } from '#/components/description';
import { schemaToDetailForm } from '#/util/tool';

import { formSchamas } from './schemas';

const record = ref();
const schemaField = ref<DescItem[]>([]);
const [Modal, ModalApi] = useVbenModal({
  footer: false,
  onOpenChange(isOpen) {
    record.value = isOpen ? ModalApi.getData()?.record : {};
    if (isOpen) {
      devSchemaFieldDetail({
        id: record.value?.id,
      }).then((data) => {
        // Object.keys(data?.ext || {}).forEach((key) => {
        //   // 处理ext.属性
        //   if (data.ext[key] !== undefined) {
        //     data[`ext.${key}`] = data.ext[key];
        //   }
        // });
        record.value = data;
        schemaField.value = schemaToDetailForm(formSchamas, data);
      });
    }
  },
});
defineExpose(ModalApi);
</script>
<template>
  <div>
    <Modal class="w-[60%]" title="模型字段详情">
      <div class="desc-wrap">
        <div
          v-for="schema in schemaField"
          :key="schema.field"
          class="desc-card"
        >
          <Description
            :data="record"
            :schema="schema.children"
            :title="schemaField.length === 1 ? undefined : schema.label"
          />
        </div>
      </div>
    </Modal>
  </div>
</template>
<style scoped lang="less">
@import '#/assets/styles/common-detail.less';
</style>
