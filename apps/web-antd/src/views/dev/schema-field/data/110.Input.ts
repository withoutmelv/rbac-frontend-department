export default {
  label: '单行文本',
  value: 'Input',
  props: [
    {
      fieldName: 'ext.type',
      label: '类型',
      component: 'Select',
      formItemClass: 'col-span-6',
      detailSpan: 6,
      componentProps: {
        class: 'w-full',
        placeholder: '请选择类型',
        options: [
          {
            label: '文本',
            value: 'text',
          },
          {
            label: '数值',
            value: 'number',
          },
          {
            label: '密码',
            value: 'password',
          },
          {
            label: '隐藏',
            value: 'hidden',
          },
          {
            label: '颜色',
            value: 'color',
          },
        ],
      },
    },
    {
      fieldName: 'ext.maxlength',
      label: '最大长度',
      component: 'InputNumber',
      formItemClass: 'col-span-6',
      detailSpan: 6,
      componentProps: {
        placeholder: '请输入最大长度',
        min: 1,
      },
    },
    {
      fieldName: 'ext.prefix',
      label: '前辍图标',
      component: 'Input',
      formItemClass: 'col-span-6',
      detailSpan: 6,
      componentProps: {
        placeholder: '请输入前辍图标',
      },
    },
    {
      fieldName: 'ext.suffix',
      label: '后辍图标',
      component: 'Input',
      formItemClass: 'col-span-6',
      detailSpan: 6,
      componentProps: {
        placeholder: '请输入后辍图标',
      },
    },
    {
      fieldName: 'ext.addonBefore',
      label: '前置标签',
      component: 'Input',
      formItemClass: 'col-span-6',
      detailSpan: 6,
      componentProps: {
        placeholder: '请输入前置标签',
      },
    },
    {
      fieldName: 'ext.addonAfter',
      label: '后置标签',
      component: 'Input',
      formItemClass: 'col-span-6',
      detailSpan: 6,
      componentProps: {
        placeholder: '请输入后置标签',
      },
    },
  ],
};
