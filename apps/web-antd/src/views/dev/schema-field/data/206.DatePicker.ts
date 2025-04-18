export default {
  label: '日期',
  value: 'DatePicker',
  props: [
    {
      fieldName: 'ext.mode',
      label: '日期面板状态',
      component: 'Select',
      formItemClass: 'col-span-12',
      detailSpan: 12,
      componentProps: {
        class: 'w-full',
        options: [
          {
            label: 'time',
            value: 'time',
          },
          {
            label: 'date',
            value: 'date',
          },
          {
            label: 'month',
            value: 'month',
          },
          {
            label: 'year',
            value: 'year',
          },
          {
            label: 'decade',
            value: 'decade',
          },
        ],
      },
    },
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
      label: '日期格式化值	',
      component: 'Input',
      help: '例：YYYY-MM-DD HH:mm:ss',
      formItemClass: 'col-span-12',
      detailSpan: 12,
      componentProps: {
        placeholder: '请输入日期格式化值',
      },
    },
  ],
};
