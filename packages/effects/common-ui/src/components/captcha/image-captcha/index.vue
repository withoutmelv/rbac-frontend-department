<script setup lang="ts">
import type { PropType } from 'vue';

import { onMounted, ref, watch } from 'vue';

import { useVModel } from '@vueuse/core';

const props = defineProps({
  api: {
    type: Function as PropType<(params: any) => Promise<unknown>>,
    default: null,
  },
  uuidField: {
    type: String,
    default: 'uuid',
  },
  base64Field: {
    type: String,
    default: 'base64',
  },
  refresh: {
    type: Boolean,
    default: false,
  },
  params: {
    type: Object,
    default: () => {
      return {};
    },
  },
  immediate: {
    type: Boolean,
    default: true,
  },
});
const emits = defineEmits(['update:modelValue', 'update:refresh', 'register']);

const mRefresh = useVModel(props, 'refresh', emits, {
  defaultValue: props.refresh,
  passive: true,
});

const uuid = ref();
const base64 = ref();
const fetch = () => {
  props.api?.(props.params).then((res: any) => {
    uuid.value = res[props.uuidField];
    base64.value = res[props.base64Field];
    emits('update:modelValue', uuid.value);
    mRefresh.value = false;
  });
};
onMounted(() => {
  if (props.immediate) {
    fetch();
  }
  emits('register', {
    refresh: fetch,
  });
});
watch(
  () => mRefresh.value,
  (val) => {
    if (val) {
      fetch();
    }
  },
);
</script>
<template>
  <div class="m-captcha">
    <img :src="base64" @click="fetch" />
  </div>
</template>
<style lang="less" scoped></style>
