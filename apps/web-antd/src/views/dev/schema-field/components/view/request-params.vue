<script setup lang="ts">
import { ref, watch } from 'vue';

import RequestParams from '../form/request-params.vue';

const props = defineProps({
  value: {
    type: Object,
    default: () => {},
  },
});
const mValue = ref<Object>(props.value);
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
  <RequestParams v-model:value="mValue" :view="true" />
</template>
