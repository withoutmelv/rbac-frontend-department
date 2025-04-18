export default {
  label: '多行文本',
  value: 'Textarea',
  props: [
    {
      fieldName: 'ext.showCount',
      label: '展示字数',
      defaultValue: true,
      component: 'Switch',
      formItemClass: 'col-span-6',
      detailSpan: 6,
      componentProps: {},
    },
    {
      fieldName: 'ext.autoSize',
      label: '高度',
      component: 'InputTextAreaAutoSize',
    },
  ],
};
