export default {
  label: '分割线',
  value: 'Divider',
  props: [
    {
      fieldName: 'ext.dashed',
      label: '是否虚线',
      component: 'RadioGroup',
      defaultValue: false,
      formItemClass: 'col-span-6',
      detailSpan: 6,
      componentProps: {
        options: [
          {
            label: '是',
            value: true,
          },
          {
            label: '否',
            value: false,
          },
        ],
      },
    },
    {
      fieldName: 'ext.plain',
      label: '普通正文样式',
      component: 'RadioGroup',
      defaultValue: false,
      formItemClass: 'col-span-6',
      detailSpan: 6,
      componentProps: {
        options: [
          {
            label: '是',
            value: true,
          },
          {
            label: '否',
            value: false,
          },
        ],
      },
    },
    {
      fieldName: 'ext.orientation',
      label: '标题位置',
      component: 'Select',
      formItemClass: 'col-span-6',
      detailSpan: 6,
      componentProps: {
        options: [
          {
            label: 'center',
            value: 'center',
          },
          {
            label: 'left',
            value: 'left',
          },
          {
            label: 'right',
            value: 'right',
          },
        ],
      },
    },
    {
      fieldName: 'ext.type',
      label: '类型',
      component: 'Select',
      formItemClass: 'col-span-6',
      detailSpan: 6,
      componentProps: {
        options: [
          {
            label: '水平',
            value: 'horizontal',
          },
          {
            label: '垂直',
            value: 'vertical',
          },
        ],
      },
    },
  ],
};
