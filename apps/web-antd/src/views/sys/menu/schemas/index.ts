import type { VxeGridProps } from '@vben/plugins/vxe-table';

import type { VbenFormProps } from '#/adapter/form';

import { h } from 'vue';

import { Icon } from '#/components/icon';
import { $t } from '#/locales';
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
    {
      field: 'name',
      title: '菜单名称',
      treeNode: true,
      align: 'left',
      slots: {
        default: ({ row }) => {
          return row.icon
            ? h('span', {}, [
                h(Icon, {
                  icon: row.icon,
                }),
                h(
                  'span',
                  {
                    style: {
                      paddingLeft: '6px',
                    },
                  },
                  $t(row.name),
                ),
              ])
            : h('span', {}, $t(row.name));
        },
      },
    },
    {
      field: 'code',
      title: '唯一编码',
    },
    {
      field: 'type',
      title: '菜单类型',
      cellRender: {
        name: 'ApiDict',
        props: {
          code: 'sys_menu_type',
        },
      },
    },
    { field: 'path', title: '路由/接口地址' },
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
    labelWidth: 110,
  },
  schema: [
    {
      fieldName: 'id',
      label: '菜单ID',
      component: 'Input',
      ifDetail: false,
      dependencies: {
        show: false,
        triggerFields: ['id'],
      },
    },
    {
      fieldName: 'type',
      label: '菜单类型',
      component: 'ApiDict',
      defaultValue: 1,
      componentProps: {
        placeholder: '请选择菜单类型',
        code: 'sys_menu_type',
        isBtn: true,
        renderType: 'RadioGroup',
      },
      formItemClass: 'col-span-6',
      detailSpan: 6,
      rules: 'selectRequired',
    },
    {
      fieldName: 'parentId',
      label: '所属上级',
      component: 'ApiTreeSelect',
      componentProps: {
        placeholder: '请选择所属上级',
        allowClear: true,
        api: '/sys/menu/tree',
        labelField: 'name',
        valueField: 'id',
      },
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
    {
      fieldName: 'name',
      label: '菜单名称',
      component: 'Input',
      componentProps: {
        placeholder: '请输入菜单名称',
        allowClear: true,
      },
      formItemClass: 'col-span-6',
      rules: 'required',
      detailSpan: 6,
    },
    {
      fieldName: 'code',
      label: '唯一编码',
      component: 'Input',
      componentProps: {
        placeholder: '请输入唯一编码',
        allowClear: true,
      },
      formItemClass: 'col-span-6',
      rules: 'required',
      detailSpan: 6,
    },
    {
      fieldName: 'path',
      label: '路由/接口地址',
      help: 'route.path',
      component: 'Input',
      componentProps: {
        placeholder: '请输入路由/接口地址',
        allowClear: true,
      },
      formItemClass: 'col-span-6',
      detailSpan: 6,
      dependencies: {
        triggerFields: ['type'],
        disabled: (values) => {
          // 路由/接口地址只有目录、菜单、接口才需配置
          return ![1, 2, 4].includes(values.type);
        },
      },
    },
    {
      fieldName: 'component',
      label: '组件地址',
      help: 'route.component',
      component: 'Input',
      componentProps: {
        placeholder: '请输入组件地址',
        allowClear: true,
      },
      formItemClass: 'col-span-6',
      detailSpan: 6,
      dependencies: {
        triggerFields: ['type'],
        disabled: (values) => {
          // 组件地址只有目录、菜单才需配置
          return ![1, 2].includes(values.type);
        },
      },
    },
    {
      fieldName: 'openType',
      label: '打开方式',
      component: 'ApiDict',
      defaultValue: 1,
      componentProps: {
        placeholder: '请选择打开方式',
        code: 'sys_menu_open_type',
        isBtn: true,
        renderType: 'RadioGroup',
      },
      formItemClass: 'col-span-6',
      detailSpan: 6,
      dependencies: {
        triggerFields: ['type'],
        disabled: (values) => {
          // 打开方式只有菜单==2才需配置
          return values.type !== 2;
        },
      },
    },
    {
      fieldName: 'icon',
      label: '图标',
      component: 'IconPicker',
      componentProps: {
        placeholder: '请选择图标',
        allowClear: true,
      },
      formItemClass: 'col-span-6',
      detailSpan: 6,
      dependencies: {
        triggerFields: ['type'],
        disabled: (values) => {
          // 图标只有目录、菜单才需配置
          return ![1, 2].includes(values.type);
        },
      },
    },
    {
      fieldName: 'url',
      label: '内外链地址',
      help: 'url',
      component: 'Input',
      componentProps: {
        placeholder: '请输入内外链地址',
        allowClear: true,
      },
      formItemClass: 'col-span-6',
      detailSpan: 6,
      dependencies: {
        triggerFields: ['openType'],
        disabled: (values) => {
          // 内外链地址只有目录、菜单才需配置
          return ![2, 3].includes(values.openType);
        },
      },
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
      formItemClass: 'col-span-3',
      detailSpan: 3,
    },
    {
      fieldName: 'isShow',
      label: '是否显示',
      component: 'ApiDict',
      defaultValue: 1,
      componentProps: {
        placeholder: '请选择是否显示',
        code: 'yes_no',
        isBtn: true,
        renderType: 'RadioGroup',
      },
      formItemClass: 'col-span-3',
      detailSpan: 3,
      dependencies: {
        triggerFields: ['type'],
        disabled: (values) => {
          // 是否显示只有目录、菜单才需配置
          return ![1, 2].includes(values.type);
        },
      },
    },
    {
      fieldName: 'isSync',
      label: '是否同步',
      component: 'ApiDict',
      defaultValue: 0,
      componentProps: {
        placeholder: '请选择是否同步',
        code: 'yes_no',
        isBtn: true,
        renderType: 'RadioGroup',
      },
      formItemClass: 'col-span-3',
      detailSpan: 3,
    },
    {
      fieldName: 'isCache',
      label: '是否缓存',
      component: 'ApiDict',
      defaultValue: 0,
      componentProps: {
        placeholder: '请选择是否缓存',
        code: 'yes_no',
        isBtn: true,
        renderType: 'RadioGroup',
      },
      formItemClass: 'col-span-3',
      detailSpan: 3,
      dependencies: {
        triggerFields: ['type'],
        disabled: (values) => {
          // 是否缓存只有目录、菜单才需配置
          return ![1, 2].includes(values.type);
        },
      },
    },
  ],
};
