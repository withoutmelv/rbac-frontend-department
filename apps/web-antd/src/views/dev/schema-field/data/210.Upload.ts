export default {
  label: '附件上传',
  value: 'Upload',
  props: [
    {
      fieldName: 'ext.action',
      label: '接口地址',
      component: 'Input',
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
    {
      fieldName: 'ext.maxSize',
      label: '单文件大小',
      component: 'InputNumber',
      defaultValue: 2,
      componentProps: {
        class: 'w-full',
        step: 10,
        min: 0,
      },
      renderComponentContent() {
        return {
          addonAfter: () => {
            return 'MB';
          },
        };
      },
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
    {
      fieldName: 'ext.maxNumber',
      label: '最大文件个数',
      component: 'InputNumber',
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
    {
      fieldName: 'ext.multiple',
      component: 'Select',
      componentProps: {
        class: 'w-full',
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
      defaultValue: false,
      label: '是否多选',
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
    {
      fieldName: 'ext.listType',
      component: 'Select',
      componentProps: {
        class: 'w-full',
        options: [
          {
            label: 'picture',
            value: 'picture',
          },
          {
            label: 'picture-card',
            value: 'picture-card',
          },
          {
            label: 'text',
            value: 'text',
          },
        ],
      },
      defaultValue: 'text',
      label: '列表类型',
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
  ],
};
