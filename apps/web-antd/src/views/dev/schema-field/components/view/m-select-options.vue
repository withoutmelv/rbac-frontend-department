<script setup lang="ts">
import { ref, watch } from 'vue';

import MSelectOptions from '../form/m-select-options.vue';

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
  <MSelectOptions v-model:value="mValue" :view="true" />
</template>
