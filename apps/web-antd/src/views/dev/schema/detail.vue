<script lang="ts" setup>
import type { DescItem } from '#/components/description';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { TabPane, Tabs } from 'ant-design-vue';

import { devSchemaDetail, devSchemaGetByTableName } from '#/api/dev/schema';
import { Description } from '#/components/description';
import { schemaToDetailForm } from '#/util/tool';

import { formSchamas } from './schemas';

const record = ref();
const schemaDescItems = ref<DescItem[]>([]);
const schemaData = ref({});
const [Modal, ModalApi] = useVbenModal({
  footer: false,
  onOpenChange(isOpen) {
    record.value = isOpen ? ModalApi.getData()?.record : {};
    if (isOpen) {
      devSchemaDetail({
        id: record.value?.id,
      }).then((data) => {
        Object.keys(data?.ext || {}).forEach((key) => {
          // 处理ext.属性
          if (data.ext[key] !== undefined) {
            data[`ext.${key}`] = data.ext[key];
          }
        });
        record.value = data;
        schemaDescItems.value = schemaToDetailForm(formSchamas, data);
      });
      devSchemaGetByTableName({
        tableName: record.value.tableName,
      }).then((res) => {
        schemaData.value = res;
      });
    }
  },
});
defineExpose(ModalApi);
</script>
<template>
  <div>
    <Modal class="w-[60%]" title="数据模型详情">
      <Tabs>
        <TabPane key="detail" tab="详情">
          <div class="desc-wrap">
            <div
              v-for="schema in schemaDescItems"
              :key="schema.field"
              class="desc-card"
            >
              <Description
                :data="record"
                :label-style="{
                  width: '150px',
                }"
                :schema="schema.children"
                :title="schemaDescItems.length === 1 ? undefined : schema.label"
              />
            </div>
          </div>
        </TabPane>
        <TabPane key="schema" tab="元数据">
          <pre>{{ schemaData }}</pre>
        </TabPane>
      </Tabs>
    </Modal>
  </div>
</template>
<style scoped lang="less">
@import '#/assets/styles/common-detail.less';
</style>
