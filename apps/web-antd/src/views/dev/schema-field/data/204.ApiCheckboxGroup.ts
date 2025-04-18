export default {
  label: '远程多选组',
  value: 'ApiCheckboxGroup',
  props: [
    {
      fieldName: 'ext.api',
      label: '接口地址',
      labelWidth: 110,
      component: 'Input',
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
    {
      fieldName: 'ext.resultField',
      label: '返回字段',
      labelWidth: 110,
      help: '接口返回的字段，如果接口返回数组，可以不填。支持x.x.x格式',
      component: 'Input',
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
    {
      fieldName: 'ext.labelField',
      label: '选项label',
      labelWidth: 110,
      help: '下拉数组项内label显示文本的字段，支持x.x.x格式',
      component: 'Input',
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
    {
      fieldName: 'ext.valueField',
      label: '选项value',
      labelWidth: 110,
      help: '下拉数组项内value实际值的字段，支持x',
      component: 'Input',
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
    {
      fieldName: 'ext.immediate',
      labelWidth: 110,
      hideLabel: true,
      component: 'Checkbox',
      renderComponentContent() {
        return {
          default: () => {
            return '是否立即请求接口，否则将在第一次点击时候触发请求';
          },
        };
      },
      defaultValue: true,
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
    {
      fieldName: 'ext.numberToString',
      labelWidth: 110,
      hideLabel: true,
      component: 'Checkbox',
      renderComponentContent() {
        return {
          default: () => {
            return '是否将number值转化为string';
          },
        };
      },
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
    {
      fieldName: 'ext.params',
      label: '请求参数',
      component: 'RequestParams',
    },
  ],
};
