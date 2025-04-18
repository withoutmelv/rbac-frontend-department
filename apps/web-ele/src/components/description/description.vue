<script setup lang="ts">
import type { DescItem } from './types';

import type { PropType } from 'vue';

import {
  ElDescriptions as Descriptions,
  ElDescriptionsItem as DescriptionsItem,
} from 'element-plus';

import { componentMap } from '#/components/view/component-map';

defineProps({
  title: { type: String, default: '' },
  border: { type: Boolean, default: true },
  column: {
    type: [Number],
    default: () => {
      // return { xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 };
      return 12;
    },
  },
  labelClassName: {
    type: String,
    default: 'w-[120px]',
  },
  className: {
    type: String,
    default: 'w-[40%]',
  },
  schema: {
    type: Array as PropType<DescItem[]>,
    default: () => [],
  },
  data: { type: Object, default: undefined },
});
</script>
<template>
  <Descriptions
    :border="border"
    :column="column"
    :title="title ? title : undefined"
  >
    <template v-for="item in schema" :key="item.field">
      <DescriptionsItem
        :class-name="className"
        :label="item.label"
        :label-class-name="labelClassName"
        :span="item.span"
      >
        <component
          :is="(componentMap as Map<String, any>).get(item.component)"
          v-if="(componentMap as Map<String, any>).has(item.component)"
          :value="data?.[item.field]"
          v-bind="{ ...item.componentProps }"
        />
        <component
          :is="item.render(data?.[item.field], data)"
          v-else-if="
            !(componentMap as Map<String, any>).has(item.component) &&
            item.render
          "
          :value="data?.[item.field]"
          v-bind="{ ...item.componentProps }"
        />
        <template v-else>{{ data?.[item.field] }}</template>
      </DescriptionsItem>
    </template>
  </Descriptions>
</template>
