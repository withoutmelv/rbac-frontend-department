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
    { field: 'name', title: '部门名称', treeNode: true, align: 'left' },
    { field: 'code', title: '唯一编码' },
    { field: 'sort', title: '排序' },
    {
      field: 'enabled',
      title: '是否启用',
      cellRender: {
        name: 'ApiDict',
        props: {
          code: 'yes_no',
        },
      },
    },
    {
      width: 160,
      title: '操作',
      align: 'center',
      slots: { default: 'ACTION' },
      fixed: 'right',
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
      label: '部门ID',
      component: 'Input',
      ifDetail: false,
      dependencies: {
        show: false,
        triggerFields: ['id'],
      },
    },
    {
      fieldName: 'parentId',
      label: '所属上级',
      component: 'ApiTreeSelect',
      componentProps: {
        placeholder: '请选择所属上级',
        allowClear: true,
        api: '/sys/dept/tree',
        labelField: 'name',
        valueField: 'id',
      },
      formItemClass: 'col-span-12',
      detailSpan: 12,
    },
    {
      fieldName: 'name',
      label: '部门名称',
      component: 'Input',
      componentProps: {
        placeholder: '请输入部门名称',
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
      fieldName: 'enabled',
      label: '是否启用',
      component: 'ApiDict',
      defaultValue: 1,
      componentProps: {
        placeholder: '请选择是否启用',
        code: 'yes_no',
        isBtn: true,
        renderType: 'RadioGroup',
      },
      formItemClass: 'col-span-12',
      detailSpan: 12,
      rules: 'selectRequired',
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
      fieldName: 'leaderIdList',
      label: '部门负责人',
      component: 'ApiSelect',
      componentProps: {
        placeholder: '请选择部门负责人',
        allowClear: true,
        api: '/sys/user/select',
        mode: 'multiple',
      },
      formItemClass: 'col-span-12',
      detailSpan: 12,
    },
    {
      fieldName: 'mainLeaderId',
      label: '分管领导',
      component: 'ApiSelect',
      componentProps: {
        placeholder: '请选择分管领导',
        allowClear: true,
        api: '/sys/user/select',
      },
      formItemClass: 'col-span-12',
      detailSpan: 12,
    },
    {
      fieldName: 'remark',
      label: '备注',
      component: 'Input',
      componentProps: {
        type: 'textarea',
        placeholder: '请输入备注',
      },
      formItemClass: 'col-span-12',
      detailSpan: 12,
    },
  ],
};
