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
    {
      field: 'schemaGroupId',
      title: '所属分组',
      cellRender: {
        name: 'ApiSelect',
        props: {
          api: '/dev/schemaGroup/select',
        },
      },
    },
    { field: 'tableName', title: '表名称' },
    { field: 'remark', title: '表注释' },
    {
      field: 'tableType',
      title: '表类型',
      width: 80,
      cellRender: {
        name: 'ApiDict',
        props: {
          code: 'dev_schema_table_type',
        },
      },
    },
    {
      field: 'icon',
      title: '图标',
      width: 60,
      cellRender: {
        name: 'IconPicker',
      },
    },
    { field: 'updateTime', title: '更新时间', width: 160 },
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
      fieldName: 'm_LIKE_tableName',
      label: '表名称',
      componentProps: {
        placeholder: '请输入表名称',
        allowClear: true,
      },
    },
    {
      component: 'Input',
      fieldName: 'm_LIKE_remark',
      label: '表注释',
      componentProps: {
        placeholder: '请输入表注释',
        allowClear: true,
      },
    },
    {
      component: 'ApiDict',
      fieldName: 'm_IN_tableType',
      label: '表类型',
      componentProps: {
        placeholder: '请选择表类型',
        code: 'dev_schema_table_type',
        allowClear: true,
        mode: 'multiple',
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
      label: '数据模型ID',
      component: 'Input',
      ifDetail: false,
      dependencies: {
        show: false,
        triggerFields: ['id'],
      },
    },
    {
      fieldName: 'tableName',
      label: '表名称',
      component: 'Input',
      componentProps: {
        placeholder: '请输入表名称',
        allowClear: true,
      },
      formItemClass: 'col-span-6',
      rules: 'required',
      detailSpan: 6,
    },
    {
      fieldName: 'remark',
      label: '表注释',
      component: 'Input',
      componentProps: {
        placeholder: '请输入表注释',
        allowClear: true,
      },
      formItemClass: 'col-span-6',
      rules: 'required',
      detailSpan: 6,
    },
    {
      fieldName: 'schemaGroupId',
      label: '所属分组',
      component: 'ApiSelect',
      componentProps: {
        placeholder: '请选择所属分组',
        allowClear: true,
        api: '/dev/schemaGroup/select',
      },
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
    {
      fieldName: 'tableType',
      label: '表类型',
      component: 'ApiDict',
      componentProps: {
        placeholder: '请选择表类型',
        allowClear: true,
        code: 'dev_schema_table_type',
      },
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
    {
      fieldName: 'formType',
      label: '表单类型',
      component: 'ApiDict',
      componentProps: {
        placeholder: '请选择表单类型',
        allowClear: true,
        code: 'dev_schema_form_type',
      },
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
    {
      fieldName: 'isTree',
      label: '是否树',
      defaultValue: 0,
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
      fieldName: 'sort',
      label: '排序',
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入排序',
        allowClear: true,
      },
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
    {
      fieldName: 'icon',
      label: '图标',
      component: 'IconPicker',
      componentProps: {
        placeholder: '请选择图标',
      },
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
    {
      fieldName: 'otherRemark',
      label: '额外说明',
      component: 'Textarea',
      componentProps: {
        placeholder: '请输入额外说明',
      },
      formItemClass: 'col-span-12',
      detailSpan: 12,
    },
    {
      fieldName: 'layoutProps',
      component: 'Divider',
      label: '布局属性',
      formItemClass: 'col-span-12',
      componentProps: {},
      hideLabel: true,
      renderComponentContent: () => {
        return {
          default: () => {
            return '布局属性';
          },
        };
      },
    },
    {
      fieldName: 'ext.layout',
      label: '表单布局',
      component: 'ApiSelect',
      componentProps: {
        class: 'w-full',
        placeholder: '请选择表单布局',
        api: () => {
          return Promise.resolve([
            { label: '水平', value: 'horizontal' },
            { label: '垂直', value: 'vertical' },
            { label: '内联', value: 'inline' },
          ]);
        },
      },
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
    {
      fieldName: 'ext.searchLayout',
      label: '搜索表单布局',
      component: 'ApiSelect',
      formItemClass: 'col-span-6',
      detailSpan: 6,
      componentProps: {
        class: 'w-full',
        placeholder: '请选择搜索表单布局',
        api: () => {
          return Promise.resolve([
            { label: '水平', value: 'horizontal' },
            { label: '垂直', value: 'vertical' },
            { label: '内联', value: 'inline' },
          ]);
        },
      },
    },
    {
      fieldName: 'ext.labelWidth',
      label: '标签宽度',
      component: 'Input',
      formItemClass: 'col-span-6',
      detailSpan: 6,
      componentProps: {
        placeholder: '请输入标签宽度',
      },
    },
    {
      fieldName: 'ext.labelAlign',
      label: '标签对齐',
      component: 'ApiSelect',
      formItemClass: 'col-span-6',
      detailSpan: 6,
      componentProps: {
        class: 'w-full',
        placeholder: '请选择对齐方式',
        api: () => {
          return Promise.resolve([
            { label: '左对齐', value: 'left' },
            { label: '右对齐', value: 'right' },
          ]);
        },
      },
    },
    {
      fieldName: 'ext.searchLabelWidth',
      label: '搜索标签宽度',
      component: 'Input',
      formItemClass: 'col-span-6',
      detailSpan: 6,
      componentProps: {
        placeholder: '请输入标签宽度',
      },
    },
    {
      fieldName: 'ext.searchLabelAlign',
      label: '搜索标签对齐',
      component: 'ApiSelect',
      formItemClass: 'col-span-6',
      detailSpan: 6,
      componentProps: {
        class: 'w-full',
        placeholder: '请选择搜索对齐方式',
        api: () => {
          return Promise.resolve([
            { label: '左对齐', value: 'left' },
            { label: '右对齐', value: 'right' },
          ]);
        },
      },
    },
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
      fieldName: 'ext.title',
      label: '菜单标题',
      component: 'Input',
      componentProps: {
        placeholder: '请输入菜单标题',
      },
      formItemClass: 'col-span-12',
      detailSpan: 12,
    },
    {
      fieldName: 'ext.async',
      label: '异步元数据',
      component: 'RadioGroup',
      defaultValue: true,
      help: '当为异步时，进入页面会通过接口重新获取元数据\n当为同步时，只使用代码生成的本地元数据',
      componentProps: {
        optionType: 'button',
        buttonStyle: 'solid',
        options: [
          {
            label: '异步',
            value: true,
          },
          {
            label: '同步',
            value: false,
          },
        ],
      },
      formItemClass: 'col-span-3',
      detailSpan: 3,
    },
    {
      fieldName: 'ext.hideMenu',
      label: '隐藏菜单',
      component: 'RadioGroup',
      defaultValue: false,
      componentProps: {
        optionType: 'button',
        buttonStyle: 'solid',
        options: [
          {
            label: '隐藏',
            value: true,
          },
          {
            label: '显示',
            value: false,
          },
        ],
      },
      formItemClass: 'col-span-3',
      detailSpan: 3,
    },
    {
      fieldName: 'ext.ignoreSync',
      label: '忽略同步',
      component: 'RadioGroup',
      defaultValue: true,
      componentProps: {
        optionType: 'button',
        buttonStyle: 'solid',
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
      formItemClass: 'col-span-3',
      detailSpan: 3,
    },
    {
      fieldName: 'ext.isCreateRoute',
      label: '是否生成路由',
      component: 'RadioGroup',
      defaultValue: true,
      componentProps: {
        optionType: 'button',
        buttonStyle: 'solid',
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
      formItemClass: 'col-span-3',
      detailSpan: 3,
    },
    {
      fieldName: 'ext.defaultAuthTypeList',
      label: '默认功能权限',
      help: '模板可根据该配置生成对应功能，同时生成对应的路由权限按钮',
      component: 'Select',
      formItemClass: 'col-span-12',
      detailSpan: 12,
      defaultValue: [
        'list',
        'save',
        'remove',
        'update',
        'detail',
        'export',
        'advSearch',
        'importTo',
        'downloadImportTemplate',
      ],
      labelWidth: 120,
      componentProps: {
        mode: 'tags',
        class: 'w-full',
        options: [
          {
            label: '列表',
            value: 'list',
          },
          {
            label: '新增',
            value: 'save',
          },
          {
            label: '删除',
            value: 'remove',
          },
          {
            label: '编辑',
            value: 'update',
          },
          {
            label: '详情',
            value: 'detail',
          },
          {
            label: '导出',
            value: 'export',
          },
          {
            label: '高级搜索',
            value: 'advSearch',
          },
          {
            label: '导入',
            value: 'importTo',
          },
          {
            label: '下载模板',
            value: 'downloadImportTemplate',
          },
        ],
      },
    },
    {
      fieldName: 'ext.customAuthTypeList',
      label: '自定义权限',
      help: '和默认功能权限一起，生成对应的路由权限按钮',
      labelWidth: 120,
      component: 'CustomAuthTypeList',
      formItemClass: 'col-span-12',
      detailSpan: 12,
    },
    {
      fieldName: 'ext.customApiList',
      label: '自定义接口',
      help: '在原有的crud接口基础上追加接口',
      labelWidth: 120,
      component: 'CustomApiList',
      formItemClass: 'col-span-12',
      detailSpan: 12,
    },
    {
      fieldName: 'ext.actions',
      label: '操作按钮配置',
      labelWidth: 120,
      component: 'TableActionList',
      formItemClass: 'col-span-12',
      detailSpan: 12,
    },
  ],
};
