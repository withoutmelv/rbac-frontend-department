<script setup lang="ts">
import { ref, watch } from 'vue';

import InputTextAreaAutoSize from '../form/input-text-area-auto-size.vue';

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
  <InputTextAreaAutoSize v-model:value="mValue" :view="true" />
</template>
