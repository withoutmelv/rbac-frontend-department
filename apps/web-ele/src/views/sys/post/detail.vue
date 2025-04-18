<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { sysPostDetail } from '#/api/sys/post';
import { type DescItem, Description } from '#/components/description';
import { schemaToDetailForm } from '#/util/tool';

import { formSchamas } from './schemas';

const record = ref();
const schemaGroup = ref<DescItem[]>([]);
const [Modal, ModalApi] = useVbenModal({
  footer: false,
  onOpenChange(isOpen) {
    record.value = isOpen ? ModalApi.getData()?.record : {};
    if (isOpen) {
      sysPostDetail({
        id: record.value?.id,
      }).then((data) => {
        record.value = data;
        schemaGroup.value = schemaToDetailForm(formSchamas, data);
      });
    }
  },
});
defineExpose(ModalApi);
</script>
<template>
  <div>
    <Modal class="w-[40%]" title="岗位详情">
      <div class="desc-wrap">
        <div
          v-for="schema in schemaGroup"
          :key="schema.field"
          class="desc-card"
        >
          <Description
            :data="record"
            :schema="schema.children"
            :title="schemaGroup.length === 1 ? undefined : schema.label"
          />
        </div>
      </div>
    </Modal>
  </div>
</template>
<style scoped lang="less">
@import '#/assets/styles/common-detail.less';
</style>
