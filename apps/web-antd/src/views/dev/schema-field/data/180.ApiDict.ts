export default {
  label: '字典',
  value: 'ApiDict',
  props: [
    {
      fieldName: 'ext.code',
      label: '字典编码',
      component: 'Input',
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
    {
      fieldName: 'ext.dataType',
      label: '数据类型',
      component: 'Select',
      formItemClass: 'col-span-6',
      detailSpan: 6,
      defaultValue: 'number',
      componentProps: {
        class: 'w-full',
        options: [
          { label: '字符串', value: 'string' },
          { label: '数值', value: 'number' },
        ],
      },
    },
    {
      fieldName: 'ext.renderType',
      label: '渲染类型',
      component: 'Select',
      formItemClass: 'col-span-6',
      detailSpan: 6,
      componentProps: {
        class: 'w-full',
        options: [
          { label: '下拉选择', value: 'Select' },
          { label: '单选框组', value: 'RadioGroup' },
        ],
      },
    },
    {
      fieldName: 'ext.isBtn',
      label: '是否按钮',
      defaultValue: true,
      component: 'Switch',
      formItemClass: 'col-span-6',
      detailSpan: 6,
      componentProps: {},
      dependencies: {
        triggerFields: ['component', 'ext'],
        if: (values: any) => {
          return (
            values.component === 'ApiDict' &&
            values.ext.ApiDict_renderType === 'RadioGroup'
          );
        },
      },
    },
  ],
};
