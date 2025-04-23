<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import {
  ElTable,
  ElTableColumn,
} from 'element-plus';

import { sysKnowledgeDetail } from '#/api/sys/knowledge';
import { GetFileList } from '#/api/langChain/knowledge-base';
import { type DescItem, Description } from '#/components/description';
import { schemaToDetailForm } from '#/util/tool';

import { formSchemas } from './schemas';

const record = ref();
const schemaGroup = ref<DescItem[]>([]);
const tableData = ref([]);
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
        GetFileList(data.name).then(data => {
          tableData.value = data || [];
        })
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
        <ElTable
          :data="tableData"
          border
          stripe
          size="small"
        >
          <ElTableColumn type="index" label="序号" width="60" align="center" />
          <ElTableColumn prop="file_name" label="名称" />
          <ElTableColumn
            prop="document_loader"
            label="知识加载器"
            width="200"
          />
          <ElTableColumn prop="text_splitter" label="分词器" width="200" />
          <ElTableColumn prop="docs_count" label="知识数量" width="120" />
        </ElTable>
      </div>
      
    </Modal>
  </div>
</template>

<style scoped lang="less">
@import '#/assets/styles/common-detail.less';
</style>
