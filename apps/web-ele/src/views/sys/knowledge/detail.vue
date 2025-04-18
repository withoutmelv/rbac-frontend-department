<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { sysKnowledgeDetail } from '#/api/sys/knowledge';
import { type DescItem, Description } from '#/components/description';
import { schemaToDetailForm } from '#/util/tool';

import { formSchemas } from './schemas';

const record = ref();
const schemaGroup = ref<DescItem[]>([]);
const [Modal, ModalApi] = useVbenModal({
  footer: false,
  onOpenChange(isOpen) {
    record.value = isOpen ? ModalApi.getData()?.record : {};
    if (isOpen) {
      sysKnowledgeDetail({
        id: record.value?.id,
      }).then((data) => {
        record.value = data;
        schemaGroup.value = schemaToDetailForm(formSchemas, data);
      });
    }
  },
});
defineExpose(ModalApi);
</script>

<template>
  <div>
    <Modal class="w-[60%]" title="知识详情">
      <div class="desc-wrap">
        <div
          v-for="schema in schemaGroup"
          :key="schema.field"
          class="desc-card"
        >
          <Description
            :data="record"
            :schema="schema.children"
            :title="schema.label"
          />
        </div>
      </div>
    </Modal>
  </div>
</template>

<style scoped lang="less">
@import '#/assets/styles/common-detail.less';
</style>
