<script setup lang="ts">
import { ref, watch } from 'vue';

import TableActionList from '../form/table-action-list.vue';

const props = defineProps({
  value: {
    type: Array,
    default: () => [],
  },
});
const mValue = ref<Array<any>>(props.value);
watch(
  () => props.value,
  (val: any) => {
    mValue.value = val;
  },
  {
    deep: true,
  },
);
</script>
<template>
  <TableActionList v-model:value="mValue" :view="true" />
</template>
