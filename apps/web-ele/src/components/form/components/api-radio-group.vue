<script setup lang="ts">
import { computed, type PropType, ref, watch, watchEffect } from 'vue';

import { isFunction } from '@vben/utils';

import { useVModel } from '@vueuse/core';
import {
  ElRadio,
  ElRadioButton,
  ElRadioGroup as RadioGroup,
} from 'element-plus';

import { requestClient } from '#/api/request';
import { get, omit } from '#/util/tool';

type OptionsItem = { disabled?: boolean; label: string; value: string };
const props = defineProps({
  value: {
    type: [String, Number, Array] as PropType<any>,
    default: undefined,
  },
  numberToString: {
    type: Boolean,
    default: false,
  },
  api: {
    type: [Function, String] as PropType<
      (arg?: any) => Promise<OptionsItem[]> | String
    >,
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
    default: 'label',
  },
  valueField: {
    type: String,
    default: 'value',
  },
  immediate: {
    type: Boolean,
    default: true,
  },
  isBtn: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(['update:value', 'optionsChange']);
const Radio = props.isBtn ? ElRadioButton : ElRadio;
const mValue = useVModel(props, 'value', emits, {
  defaultValue: props.value,
  passive: true,
});
const options = ref<OptionsItem[]>([]);
const loading = ref(false);
const isFirstLoad = ref(true);
const getOptions = computed(() => {
  const { labelField, valueField, numberToString } = props;
  const res: OptionsItem[] = [];
  options.value.forEach((item: any) => {
    const value = item[valueField];
    res.push({
      ...omit(item, [labelField, valueField]),
      label: item[labelField],
      value: numberToString ? `${value}` : value,
      disabled: item.disabled || false,
    });
  });
  return res;
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
      options.value = res;
      emits('optionsChange', options.value);
    } else {
      options.value = props.resultField ? get(res, props.resultField) : [];
      emits('optionsChange', options.value);
    }
  } catch (error) {
    console.warn(error);
  } finally {
    loading.value = false;
  }
};
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
  <RadioGroup
    v-bind="$attrs"
    v-model:value="mValue"
    :button-style="isBtn ? 'solid' : 'outline'"
    :option-type="isBtn ? 'button' : 'default'"
    :options="getOptions"
    class="w-full"
  >
    <Radio v-for="item in getOptions" :key="item.value" :value="item.value">
      {{ item.label }}
    </Radio>
  </RadioGroup>
</template>
