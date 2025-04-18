<script setup lang="ts">
import { ref, watch } from 'vue';

import CustomAuthTypeList from '../form/custom-auth-type-list.vue';

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
  <CustomAuthTypeList v-model:value="mValue" :view="true" />
</template>
