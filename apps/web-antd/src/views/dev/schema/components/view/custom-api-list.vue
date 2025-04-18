<script setup lang="ts">
import { ref, watch } from 'vue';

import CustonApiList from '../form/custom-api-list.vue';

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
  <CustonApiList v-model:value="mValue" :view="true" />
</template>
