export default {
  label: '复选组',
  value: 'CheckboxGroup',
  props: [
    {
      fieldName: 'ext.dataType',
      label: '数据类型',
      component: 'Select',
      formItemClass: 'col-span-12',
      detailSpan: 12,
      defaultValue: 'boolean',
      componentProps: {
        class: 'w-full',
        options: [
          { label: '字符串', value: 'string' },
          { label: '数值', value: 'number' },
          { label: '布尔值', value: 'boolean' },
        ],
      },
    },
    {
      fieldName: 'ext.options',
      label: '选项配置',
      component: 'MSelectOptions',
      formItemClass: 'col-span-12',
      detailSpan: 12,
    },
  ],
};
