export default {
  label: '日期区间',
  value: 'RangePicker',
  props: [
    {
      fieldName: 'ext.format',
      label: '日期格式化',
      component: 'Input',
      help: '例：YYYY-MM-DD HH:mm:ss',
      formItemClass: 'col-span-6',
      detailSpan: 6,
      componentProps: {
        placeholder: '请输入日期格式化',
      },
    },
    {
      fieldName: 'ext.valueFormat',
      label: '日期格式化值',
      component: 'Input',
      help: '例：YYYY-MM-DD HH:mm:ss',
      formItemClass: 'col-span-6',
      detailSpan: 6,
      componentProps: {
        placeholder: '请输入日期格式化值	',
      },
    },
  ],
};
