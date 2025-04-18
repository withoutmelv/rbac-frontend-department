<script setup>
import { ref, watch } from 'vue';

import { Checkbox, InputNumber } from 'ant-design-vue';

defineOptions({
  inheritAttrs: false,
});
const props = defineProps({
  value: {
    type: [Boolean, Object],
    default: false,
  },
});
const emits = defineEmits(['update:value']);
const mValue = ref(props.value === true);
const maxMinRows = ref({
  minRows: props.value?.minRows,
  maxRows: props.value?.maxRows,
});

watch(
  () => mValue.value,
  () => {
    if (mValue.value) {
      emits('update:value', true);
    } else {
      if (maxMinRows.value.minRows && maxMinRows.value.maxRows) {
        emits('update:value', maxMinRows.value);
      } else {
        emits('update:value', false);
      }
    }
  },
);
watch(
  () => maxMinRows.value,
  () => {
    if (maxMinRows.value.minRows && maxMinRows.value.maxRows) {
      emits('update:value', maxMinRows.value);
    } else {
      emits('update:value', false);
    }
  },
  { deep: true },
);
</script>
<template>
  <div>
    <Checkbox v-model:checked="mValue">自适应高度</Checkbox>
    <InputNumber
      v-if="!mValue"
      v-model:value="maxMinRows.minRows"
      :min="1"
      placeholder="最小行"
    />
    <InputNumber
      v-if="!mValue"
      v-model:value="maxMinRows.maxRows"
      :min="1"
      class="mt-2"
      placeholder="最大行"
    />
  </div>
</template>
