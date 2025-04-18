export default {
  label: '自定义组件',
  value: 'CustomComponent',
  props: [
    {
      fieldName: 'ext.componentName',
      label: '组件名称',
      helpMessage: [
        '对应xx/components/form和xx/components/view下的*.vue文件名',
        '前者为表单组件，后面为列表或详情页显示组件',
      ],
      component: 'Input',
      formItemClass: 'col-span-12',
      detailSpan: 12,
      componentProps: {
        placeholder: '请输入组件名称',
      },
    },
    {
      fieldName: 'ext.params',
      label: '组件参数',
      component: 'Textarea',
      formItemClass: 'col-span-12',
      detailSpan: 12,
      componentProps: {
        placeholder: '请输入组件参数',
      },
    },
  ],
};
