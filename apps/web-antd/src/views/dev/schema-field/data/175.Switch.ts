export default {
  label: '开关',
  value: 'Switch',
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
      fieldName: 'ext.checkedValue',
      label: '选中时的值',
      component: 'Input',
      formItemClass: 'col-span-12',
      detailSpan: 12,
      componentProps: {
        placeholder: '请输入选中时的值',
      },
      dependencies: {
        triggerFields: ['component', 'ext'],
        if: (values: any) => {
          return (
            values.component === 'Switch' &&
            values.ext.Switch_dataType !== 'boolean'
          );
        },
      },
    },
    {
      fieldName: 'ext.unCheckedValue',
      label: '非选中时的值',
      component: 'Input',
      formItemClass: 'col-span-12',
      detailSpan: 12,
      componentProps: {
        placeholder: '请输入非选中时的值',
      },
      dependencies: {
        triggerFields: ['component', 'ext'],
        if: (values: any) => {
          return (
            values.component === 'Switch' &&
            values.ext.Switch_dataType !== 'boolean'
          );
        },
      },
    },
  ],
};
