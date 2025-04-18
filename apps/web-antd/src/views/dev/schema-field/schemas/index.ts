import type { VxeGridProps } from '@vben/plugins/vxe-table';

import type { VbenFormProps } from '#/adapter/form';

import { computed } from 'vue';

import { useAccess } from '@vben/access';

import { componentData, componentPropsData } from '../data';
// 判断是否有拖拽权限
const canRowDrag = computed(() => {
  const { hasAccessByCodes } = useAccess();
  return hasAccessByCodes(['admin', 'dev:schemaField:updateSort']);
});
// 表格参数定义
export const gridSchemas: VxeGridProps<any> = {
  toolbarConfig: {
    refresh: true, // 刷新
    print: false, // 打印
    export: false, // 导出
    // custom: true, // 自定义列
    zoom: true, // 最大化最小化
  },
  rowConfig: {
    useKey: true,
    drag: canRowDrag.value,
  },
  columns: [
    { type: 'checkbox', width: 60 },
    {
      field: 'fieldName',
      title: '字段名称',
      align: 'left',
      dragSort: canRowDrag.value,
    },
    { field: 'remark', title: '字段注释' },
    {
      field: 'component',
      title: '组件名称',
      slots: {
        default({ row }: any) {
          if (row.component === 'CustomComponent') {
            return `${row.ext[`${row.component}_componentName`]}`;
          }
          return `${row.component}`;
        },
      },
    },
    {
      field: 'nullable',
      title: '允许为空',
      cellRender: {
        name: 'ApiDict',
        props: {
          code: 'yes_no',
        },
      },
    },
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
// 表单参数定义
export const formSchamas: VbenFormProps = {
  wrapperClass: 'grid-cols-12', // 24栅格,
  commonConfig: {
    formItemClass: 'col-span-12',
  },
  schema: [
    {
      fieldName: 'baseinfo',
      component: 'Divider',
      label: '基础信息',
      formItemClass: 'col-span-12',
      componentProps: {},
      hideLabel: true,
      renderComponentContent: () => {
        return {
          default: () => {
            return '基础信息';
          },
        };
      },
    },
    {
      fieldName: 'id',
      label: '数据模型字段ID',
      component: 'Input',
      ifDetail: false,
      dependencies: {
        show: false,
        triggerFields: ['id'],
      },
    },
    {
      fieldName: 'schemaId',
      label: '数据模型ID',
      component: 'Input',
      ifDetail: false,
      dependencies: {
        show: false,
        triggerFields: ['schemaId'],
      },
    },
    {
      fieldName: 'fieldName',
      label: '字段名称',
      component: 'Input',
      componentProps: {
        placeholder: '请输入字段名称',
        allowClear: true,
      },
      formItemClass: 'col-span-6',
      rules: 'required',
      detailSpan: 6,
    },
    {
      fieldName: 'remark',
      label: '字段注释',
      component: 'Input',
      componentProps: {
        placeholder: '请输入字段注释',
      },
      formItemClass: 'col-span-6',
      rules: 'required',
      detailSpan: 6,
    },
    {
      fieldName: 'fieldSize',
      label: '字段长度',
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入字段长度',
      },
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
    {
      fieldName: 'dataType',
      label: '数据类型',
      component: 'ApiDict',
      componentProps: {
        placeholder: '请选择数据类型',
        code: 'dev_schema_field_data_type',
      },
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
    {
      fieldName: 'isPrimary',
      label: '是否主键',
      component: 'ApiDict',
      defaultValue: 0,
      componentProps: {
        code: 'yes_no',
        renderType: 'RadioGroup',
        isBtn: true,
      },
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
    {
      fieldName: 'nullable',
      label: '允许为空',
      defaultValue: 1,
      component: 'ApiDict',
      componentProps: {
        code: 'yes_no',
        renderType: 'RadioGroup',
        isBtn: true,
      },
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
    {
      fieldName: 'defaultValue',
      label: '默认值',
      component: 'Textarea',
      componentProps: {
        placeholder: '请输入默认值',
      },
      formItemClass: 'col-span-12',
      detailSpan: 12,
    },
    {
      fieldName: 'ext.memorandum',
      label: '备忘录',
      component: 'Textarea',
      help: '方便配置人员对特殊情况做备忘',
      componentProps: {
        placeholder: '请输入备忘录',
      },
      formItemClass: 'col-span-12',
      detailSpan: 12,
    },
    {
      fieldName: 'formProps',
      component: 'Divider',
      label: '表单属性',
      formItemClass: 'col-span-12',
      componentProps: {},
      hideLabel: true,
      renderComponentContent: () => {
        return {
          default: () => {
            return '表单属性';
          },
        };
      },
    },
    {
      fieldName: 'component',
      label: '组件类型',
      component: 'Select',
      defaultValue: 'Input',
      formItemClass: 'col-span-6',
      detailSpan: 6,
      componentProps: {
        class: 'w-full',
        options: componentData,
      },
      rules: 'selectRequired',
    },
    {
      fieldName: 'ext.searchType',
      label: '搜索类型',
      component: 'Select',
      formItemClass: 'col-span-3',
      detailSpan: 3,
      componentProps: {
        class: 'w-full',
        placeholder: '请选择搜索类型',
        options: [
          { label: '等值', value: 'EQ' },
          { label: '包含', value: 'IN' },
          { label: '模糊', value: 'LIKE' },
          { label: '区间', value: 'BT' },
        ],
      },
    },
    {
      fieldName: 'ext.tableAlias',
      label: '表别名',
      help: '有些自定义查询需要追加表别名',
      component: 'Input',
      formItemClass: 'col-span-3',
      componentProps: {
        placeholder: '请输入表别名',
      },
    },
    {
      fieldName: 'ext.placeholder',
      label: '占位文本',
      component: 'Input',
      formItemClass: 'col-span-6',
      detailSpan: 6,
      componentProps: {
        placeholder: '请输入占位文本',
      },
    },
    {
      fieldName: 'ext.help',
      label: '提示语',
      component: 'Textarea',
      formItemClass: 'col-span-6',
      detailSpan: 6,
      componentProps: {
        placeholder: '请输入提示语',
      },
    },
    {
      fieldName: 'ext.addHide',
      label: '新增隐藏',
      component: 'ApiDict',
      defaultValue: 0,
      formItemClass: 'col-span-3',
      detailSpan: 3,
      componentProps: {
        isBtn: true,
        code: 'yes_no',
        placeholder: '请选择新增隐藏',
        renderType: 'RadioGroup',
      },
    },
    {
      fieldName: 'ext.editHide',
      label: '编辑隐藏',
      component: 'ApiDict',
      defaultValue: 0,
      formItemClass: 'col-span-3',
      detailSpan: 3,
      componentProps: {
        isBtn: true,
        code: 'yes_no',
        placeholder: '请选择编辑隐藏',
        renderType: 'RadioGroup',
      },
    },
    {
      fieldName: 'ext.listHide',
      label: '列表隐藏',
      component: 'ApiDict',
      defaultValue: 0,
      formItemClass: 'col-span-3',
      detailSpan: 3,
      componentProps: {
        isBtn: true,
        code: 'yes_no',
        placeholder: '请选择列表隐藏',
        renderType: 'RadioGroup',
      },
    },
    {
      fieldName: 'ext.viewHide',
      label: '详情隐藏',
      component: 'ApiDict',
      defaultValue: 0,
      formItemClass: 'col-span-3',
      detailSpan: 3,
      componentProps: {
        isBtn: true,
        code: 'yes_no',
        placeholder: '请选择详情隐藏',
        renderType: 'RadioGroup',
      },
    },
    {
      fieldName: 'ext.addDisabled',
      label: '新增禁止',
      component: 'ApiDict',
      defaultValue: 0,
      formItemClass: 'col-span-3',
      detailSpan: 3,
      componentProps: {
        isBtn: true,
        code: 'yes_no',
        placeholder: '请选择新增禁止',
        renderType: 'RadioGroup',
      },
    },
    {
      fieldName: 'ext.editDisabled',
      label: '编辑禁止',
      component: 'ApiDict',
      defaultValue: 0,
      formItemClass: 'col-span-3',
      detailSpan: 3,
      componentProps: {
        isBtn: true,
        code: 'yes_no',
        placeholder: '请选择编辑禁止',
        renderType: 'RadioGroup',
      },
    },
    {
      fieldName: 'ext.required',
      label: '必填',
      component: 'ApiDict',
      defaultValue: 0,
      formItemClass: 'col-span-3',
      detailSpan: 3,
      componentProps: {
        isBtn: true,
        code: 'yes_no',
        placeholder: '请选择必填',
        renderType: 'RadioGroup',
      },
    },
    {
      fieldName: 'ext.search',
      label: '搜索',
      component: 'ApiDict',
      defaultValue: 0,
      formItemClass: 'col-span-3',
      detailSpan: 3,
      componentProps: {
        isBtn: true,
        code: 'yes_no',
        placeholder: '请选择搜索',
        renderType: 'RadioGroup',
      },
    },
    {
      fieldName: 'ext.span',
      label: '栅格占位',
      component: 'InputNumber',
      formItemClass: 'col-span-6',
      detailSpan: 6,
      componentProps: {
        min: 1,
        max: 24,
        placeholder: '请输入栅格占位',
      },
    },
    {
      fieldName: 'ext.searchSpan',
      label: '搜索栅格占位',
      component: 'InputNumber',
      formItemClass: 'col-span-6',
      detailSpan: 6,
      componentProps: {
        min: 1,
        max: 24,
        placeholder: '请输入搜索栅格占位',
      },
    },
    // 组件自定义配置
    ...componentPropsData,
    {
      fieldName: 'extProps',
      component: 'Divider',
      label: '扩展属性',
      formItemClass: 'col-span-12',
      componentProps: {},
      hideLabel: true,
      renderComponentContent: () => {
        return {
          default: () => {
            return '扩展属性';
          },
        };
      },
    },
    {
      fieldName: 'ext.controlledFieldName',
      label: '被字段控制名',
      component: 'Input',
      labelWidth: 120,
      formItemClass: 'col-span-6',
      detailSpan: 6,
      help: '该字段被控制的表单字段名',
      componentProps: {
        placeholder: '请输入被字段控制名',
      },
    },
    {
      fieldName: 'ext.controlledFieldValue',
      label: '被字段控制值',
      component: 'Input',
      labelWidth: 120,
      formItemClass: 'col-span-6',
      detailSpan: 6,
      help: '被字段控制的表单字段值为该值时，才显示 多个则使用英文逗号分割',
      componentProps: {
        placeholder: '请输入被字段控制值',
      },
    },
    {
      fieldName: 'ext.excelColumnHandlerType',
      label: 'excel列处理类型',
      labelWidth: 120,
      component: 'ApiDict',
      formItemClass: 'col-span-6',
      detailSpan: 6,
      componentProps: {
        code: 'excel_column_handler',
        placeholder: '请选择excel列处理类型',
      },
    },
  ],
};
