<script setup lang="ts">
import { computed, type PropType, ref, watch, watchEffect } from 'vue';

import { isFunction } from '@vben/utils';

import { useVModel } from '@vueuse/core';
import { ElTreeSelect } from 'element-plus';

import { requestClient } from '#/api/request';
import { get } from '#/util/tool';

const props = defineProps({
  value: {
    type: [String, Number, Array] as PropType<any>,
    default: undefined,
  },
  api: {
    type: [Function, String] as PropType<(arg?: any) => Promise<any> | String>,
    default: null,
  },
  requestMethod: {
    // 请求方法
    type: String,
    default: 'post',
  },
  // api params
  params: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
  // support xxx.xxx.xx
  resultField: {
    type: String,
    default: '',
  },
  labelField: {
    type: String,
    default: 'title',
  },
  valueField: {
    type: String,
    default: 'value',
  },
  childrenField: {
    type: String,
    default: 'children',
  },
  immediate: {
    type: Boolean,
    default: true,
  },
});
const emits = defineEmits(['update:value', 'treeDataChange']);
const mValue = useVModel(props, 'value', emits, {
  defaultValue: props.value,
  passive: true,
});
const treeData = ref<any>([]);
const loading = ref(false);
const isFirstLoad = ref(true);
const getTreeData = computed(() => {
  return treeData.value;
});

const fetch = async () => {
  const api: any =
    typeof props.api === 'string' && props.api
      ? (params: any) => {
          return (requestClient as any)[props.requestMethod](
            props.api as any,
            params,
          );
        }
      : props.api;
  if (!api || !isFunction(api)) return;
  try {
    loading.value = true;
    const params =
      props.requestMethod === 'get' ? { params: props.params } : props.params;
    const res = await api(params);
    if (Array.isArray(res)) {
      treeData.value = res;
      emits('treeDataChange', treeData.value);
    } else {
      treeData.value = props.resultField ? get(res, props.resultField) : [];
      emits('treeDataChange', treeData.value);
    }
  } catch (error) {
    console.warn(error);
  } finally {
    loading.value = false;
  }
};
async function handleFetch() {
  if (!props.immediate && isFirstLoad.value) {
    await fetch();
    isFirstLoad.value = false;
  }
}

watchEffect(() => {
  props.immediate && fetch();
});

watch(
  () => props.params,
  () => {
    !isFirstLoad.value && fetch();
  },
  { deep: true },
);
</script>

<template>
  <ElTreeSelect
    v-model:value="mValue"
    :data="getTreeData"
    :node-key="props.valueField"
    :props="{
      label: props.labelField,
      children: props.childrenField,
    }"
    class="w-full"
    @dropdown-visible-change="handleFetch"
  >
    <template v-for="item in Object.keys($slots)" #[item]="data">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </ElTreeSelect>
</template>
