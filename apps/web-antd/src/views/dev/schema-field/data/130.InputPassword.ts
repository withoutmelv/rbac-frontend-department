export default {
  label: '密码输入框',
  value: 'InputPassword',
  props: [
    {
      fieldName: 'ext.visibilityToggle',
      label: '显示切换按钮',
      defaultValue: true,
      component: 'Switch',
      formItemClass: 'col-span-6',
      detailSpan: 6,
      componentProps: {},
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
