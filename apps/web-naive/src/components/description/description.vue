<script setup lang="ts">
import type { DescItem } from './types';

import type { PropType } from 'vue';

import {
  NDescriptions as Descriptions,
  NDescriptionsItem as DescriptionsItem,
} from 'naive-ui';

import { componentMap } from '#/components/view/component-map';

defineProps({
  title: { type: String, default: '' },
  bordered: { type: Boolean, default: true },
  column: {
    type: [Number],
    default: () => {
      // return { xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 };
      return 12;
    },
  },
  labelStyle: {
    type: Object,
    default() {
      return {
        width: '120px',
      };
    },
  },
  contentStyle: {
    type: Object,
    default() {
      return {
        width: '40%',
      };
    },
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
    :bordered="bordered"
    :column="column"
    :content-style="contentStyle"
    :label-style="labelStyle"
    :title="title ? title : undefined"
    label-placement="left"
  >
    <template v-for="item in schema" :key="item.field">
      <DescriptionsItem :label="item.label" :span="item.span">
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
