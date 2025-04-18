<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Col, Row } from 'ant-design-vue';

import KeysTable from './components/keys-table.vue';

const record = ref({
  schemaId: undefined,
});
const [Modal, ModalApi] = useVbenModal({
  footer: false,
  onOpenChange(isOpen) {
    record.value = isOpen
      ? ModalApi.getData()?.record
      : {
          schemaId: undefined,
        };
  },
});
defineExpose(ModalApi);
</script>
<template>
  <div>
    <Modal class="w-[80%]" title="调整搜索/列表排序">
      <Row>
        <Col :span="12">
          <KeysTable :schema-id="record.schemaId" type="searchFormKeys" />
        </Col>
        <Col :span="12">
          <KeysTable :schema-id="record.schemaId" type="listKeys" />
        </Col>
      </Row>
    </Modal>
  </div>
</template>
