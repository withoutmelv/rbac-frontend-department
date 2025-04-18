import type { VxeGridProps } from '@vben/plugins/vxe-table';

import type { VbenFormProps } from '#/adapter/form';
// 表格参数定义
export const gridSchemas: VxeGridProps<any> = {
  toolbarConfig: {
    refresh: true, // 刷新
    print: false, // 打印
    export: false, // 导出
    // custom: true, // 自定义列
    zoom: true, // 最大化最小化
  },
  columns: [
    { type: 'checkbox', width: 60 },
    { field: 'name', title: '分组名称', align: 'left' },
    { field: 'code', title: '唯一编码' },
    {
      field: 'icon',
      title: '图标',
      width: 60,
      cellRender: {
        name: 'IconPicker',
      },
    },
    { field: 'sort', title: '排序' },
    { field: 'remark', title: '备注' },
    { field: 'createTime', title: '创建时间' },
    { field: 'updateTime', title: '更新时间' },
    {
      width: 160,
      title: '操作',
      align: 'center',
      slots: { default: 'ACTION' },
      fixed: 'right',
    },
  ],
};
// 搜索表单参数定义
export const searchFormSchemas: VbenFormProps = {
  schema: [
    {
      component: 'Input',
      fieldName: 'm_LIKE_name',
      label: '分组名称',
      componentProps: {
        placeholder: '请输入分组名称',
        allowClear: true,
      },
    },
    {
      component: 'Input',
      fieldName: 'm_LIKE_code',
      label: '唯一编码',
      componentProps: {
        placeholder: '请输入唯一编码',
        allowClear: true,
      },
    },
  ],
};
// 表单参数定义
export const formSchamas: VbenFormProps = {
  wrapperClass: 'grid-cols-12', // 24栅格,
  commonConfig: {
    formItemClass: 'col-span-12',
  },
  schema: [
    {
      fieldName: 'id',
      label: '数据模型分组ID',
      component: 'Input',
      ifDetail: false,
      dependencies: {
        show: false,
        triggerFields: ['id'],
      },
    },
    {
      fieldName: 'name',
      label: '分组名称',
      component: 'Input',
      componentProps: {
        placeholder: '请输入分组名称',
        allowClear: true,
      },
      formItemClass: 'col-span-12',
      rules: 'required',
      detailSpan: 12,
    },
    {
      fieldName: 'code',
      label: '唯一编码',
      component: 'Input',
      componentProps: {
        placeholder: '请输入唯一编码',
        allowClear: true,
      },
      formItemClass: 'col-span-12',
      rules: 'required',
      detailSpan: 12,
    },
    {
      fieldName: 'icon',
      label: '图标',
      component: 'IconPicker',
      componentProps: {
        placeholder: '请选择图标',
      },
      formItemClass: 'col-span-12',
      detailSpan: 12,
    },
    {
      fieldName: 'sort',
      label: '排序',
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入排序',
        allowClear: true,
      },
      formItemClass: 'col-span-12',
      detailSpan: 12,
    },
    {
      fieldName: 'remark',
      label: '备注',
      component: 'Textarea',
      componentProps: {
        placeholder: '请输入备注',
      },
      formItemClass: 'col-span-12',
      detailSpan: 12,
    },
  ],
};
