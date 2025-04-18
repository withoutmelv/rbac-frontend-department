export default {
  label: '远程树',
  value: 'ApiTreeSelect',
  props: [
    {
      fieldName: 'ext.api',
      label: '接口地址',
      labelWidth: 110,
      component: 'Input',
      formItemClass: 'col-span-12',
      detailSpan: 12,
    },
    {
      fieldName: 'ext.viewLabelKey',
      label: '回显的key',
      help: '算是一种优化，数据库一般只存储id，前端列表和详情页需要回显成对应的文本',
      labelWidth: 110,
      component: 'Input',
      formItemClass: 'col-span-12',
      detailSpan: 12,
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
      formItemClass: 'col-span-12',
      detailSpan: 12,
    },
    // {
    //   fieldName: 'ext.replaceFields',
    //   labelWidth: '110px',
    //   label: 'replaceFields',
    //   help: '替换 treeNode 中 title,value,key,children 字段为 treeData 中对应的字段',
    //   component: 'TreeSelectReplaceFields',
    //   formItemClass: 'col-span-12',
    //   detailSpan: 12,
    // },
    {
      fieldName: 'ext.params',
      label: '请求参数',
      component: 'RequestParams',
      formItemClass: 'col-span-12',
      detailSpan: 12,
    },
  ],
};
