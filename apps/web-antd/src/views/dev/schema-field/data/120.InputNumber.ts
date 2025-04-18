export default {
  label: '数值输入框',
  value: 'InputNumber',
  props: [
    {
      fieldName: 'ext.max',
      label: '最大值',
      component: 'InputNumber',
      formItemClass: 'col-span-6',
      detailSpan: 6,
      componentProps: {
        placeholder: '请输入最大值',
      },
    },
    {
      fieldName: 'ext.min',
      label: '最小值',
      component: 'InputNumber',
      formItemClass: 'col-span-6',
      detailSpan: 6,
      componentProps: {
        placeholder: '请输入最小值',
      },
    },
    {
      fieldName: 'ext.step',
      label: '步数',
      component: 'InputNumber',
      formItemClass: 'col-span-6',
      detailSpan: 6,
      componentProps: {
        placeholder: '请输入步数',
      },
    },
    {
      fieldName: 'ext.precision',
      label: '数值精度',
      component: 'InputNumber',
      formItemClass: 'col-span-6',
      detailSpan: 6,
      componentProps: {
        placeholder: '请输入数值精度',
      },
    },
  ],
};
