<script setup lang="ts">
import { computed, ref } from 'vue';

import * as icons from '@element-plus/icons-vue';
import { useVModel } from '@vueuse/core';
import {
  ElIcon,
  ElInput as Input,
  ElPagination as Pagination,
  ElPopover as Popover,
} from 'element-plus';

import { Icon } from '#/components/icon';
import { toKebabCase } from '#/util/tool';

const props = defineProps({
  value: {
    type: [String],
    default: undefined,
  },
  allowClear: {
    type: Boolean,
    default: true,
  },
  readonly: {
    type: Boolean,
    default: true,
  },
});
const emits = defineEmits(['update:value']);
const mValue = useVModel(props, 'value', emits, {
  defaultValue: props.value,
  passive: true,
});
const pageSize = ref(120);
const pageNum = ref(1);
const searchValue = ref('');
const trigger = ref<HTMLDivElement>();

const triggerPopover = () => {
  if (trigger.value) {
    trigger.value.click();
  }
};
const getIconKeys = computed(() => {
  return Object.keys(icons).filter((key) => {
    // 移除双色的图标
    return (
      !key.endsWith('TwoTone') &&
      ![
        'createFromIconfontCN',
        'default',
        'getTwoToneColor',
        'setTwoToneColor',
      ].includes(key)
    );
  });
});
const iconData = computed(() => {
  const keys = getIconKeys.value.slice(
    (pageNum.value - 1) * pageSize.value,
    pageNum.value * pageSize.value,
  );
  return keys
    .map((item) => {
      return {
        icon: `ep:${toKebabCase(`${item}`)}`,
      };
    })
    .filter((item) => {
      if (searchValue.value) {
        return item.icon.includes(searchValue.value);
      }
      return true;
    });
});
const getTotal = computed(() => {
  return searchValue.value
    ? iconData.value.length
    : Object.keys(getIconKeys.value).length;
});
const handlePageChange = (page: number) => {
  pageNum.value = page;
};
</script>
<template>
  <Input
    v-model:value="mValue"
    :allow-clear="allowClear"
    :readonly="readonly"
    @click="triggerPopover"
  >
    <template #append>
      <Popover :width="300" trigger="click">
        <div class="flex justify-between">
          <Input
            v-model="searchValue"
            allow-clear
            placeholder="搜索图标"
            size="small"
          />
        </div>

        <div
          class="grid grid-cols-12"
          style="height: 200px; margin-top: 12px; overflow: auto"
        >
          <div
            v-for="item in iconData"
            :key="item.icon"
            :class="
              item.icon === mValue
                ? 'm-icon-wrap-selected col-span-2 flex justify-center'
                : 'm-icon-wrap col-span-2 flex justify-center'
            "
            @click="mValue = item.icon"
          >
            <ElIcon>
              <Icon :icon="item.icon" />
            </ElIcon>
          </div>
        </div>
        <div
          v-if="getTotal >= pageSize"
          class="flex items-center justify-center py-2"
        >
          <Pagination
            :page-size="pageSize"
            :total="getTotal"
            layout="prev, pager, next"
            size="small"
            @change="handlePageChange"
          />
        </div>
        <template #reference>
          <div ref="trigger">
            <ElIcon>
              <Icon :icon="mValue || 'ep:search'" />
            </ElIcon>
          </div>
        </template>
      </Popover>
    </template>
  </Input>
</template>
<style lang="less" scoped>
.m-icon-wrap {
  cursor: pointer;
  padding-top: 10px;
  padding-bottom: 10px;
}
.m-icon-wrap:hover {
  border: 1px solid blue;
}
.m-icon-wrap-selected {
  cursor: pointer;
  padding-top: 10px;
  border: 1px solid blue;
  cursor: pointer;
}
</style>
