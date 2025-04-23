import type { VxeGridProps } from '@vben/plugins/vxe-table';

import type { VbenFormProps } from '#/adapter/form';

import { h } from 'vue';

import { UploadFilled } from '@element-plus/icons-vue';
import dayjs from 'dayjs';
import { ElIcon } from 'element-plus';
import { z } from '#/adapter/form';

import { typeMap } from '#/constant/knowledge';
// 表格参数定义
export const gridSchemas: VxeGridProps<any> = {
  toolbarConfig: {
    refresh: true,
    print: false,
    export: false,
    zoom: true,
  },
  columns: [
    { type: 'checkbox', width: 60 },
    {
      field: 'id',
      title: 'ID',
      minWidth: 30,
    },
    {
      field: 'name',
      title: '知识标题',
      minWidth: 130,
    },
    {
      field: 'type',
      title: '知识类型',
      minWidth: 100,
      formatter: ({ cellValue }) => {
        return typeMap[cellValue] || cellValue;
      },
    },
    {
      field: 'deptId',
      title: '所属部门',
      minWidth: 100,
      cellRender: {
        name: 'ApiTreeSelect',
        props: {
          api: '/sys/dept/tree',
          labelField: 'name',
          valueField: 'id',
        },
      },
    },
    {
      field: 'description',
      title: '知识库简介',
      minWidth: 150,
    },
    {
      field: 'fileCount',
      title: '文件数量',
      minWidth: 50,
    },
    // {
    //   field: 'createTime',
    //   title: '创建时间',
    //   minWidth: 100,
    //   formatter: ({ cellValue }) => {
    //     return cellValue ? dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss') : '';
    //   }
    // },
    {
      field: 'updateTime',
      title: '更新时间',
      minWidth: 100,
      formatter: ({ cellValue }) => {
        return cellValue ? dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss') : '';
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

// 搜索表单参数定义
export const searchFormSchemas: VbenFormProps = {
  schema: [
    {
      component: 'Input',
      fieldName: 'm_LIKE_name',
      label: '知识标题',
      componentProps: {
        placeholder: '请输入知识标题',
        allowClear: true,
      },
    },
    {
      component: 'Select',
      fieldName: 'm_EQ_type',
      label: '知识类型',
      componentProps: {
        placeholder: '请选择知识类型',
        allowClear: true,
        options: [
          { label: '部门知识库', value: 'department' },
          { label: '公共知识库', value: 'public' },
        ],
        mode: 'multiple',
      },
    },
  ],
};

// 表单参数定义
export const formSchemas: VbenFormProps = {
  wrapperClass: 'grid-cols-12',
  commonConfig: {
    formItemClass: 'col-span-12',
    labelWidth: 120,
  },
  schema: [
    {
      fieldName: 'deptId',
      label: '所属部门',
      component: 'ApiTreeSelect',
      defaultValue: '-',
      componentProps: {
        placeholder: '请选择所属部门',
        api: '/sys/dept/tree',
        labelField: 'name',
        valueField: 'id',
        allowClear: true,
      },
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
    {
      fieldName: 'name',
      label: '知识库标题',
      component: 'Input',
      componentProps: {
        placeholder: '请输入知识库标题',
        maxlength: 50,
      },
      formItemClass: 'col-span-12',
      detailSpan: 12,
      rules: z.string()
        .min(1, { message: '请输入知识库标题' })
        .refine((value) => {
          // 修改正则表达式，支持中文，同时保证不以数字开头且不包含大写字母
          const pattern = /^[^0-9][a-z0-9_\u4e00-\u9fa5]*$/;
          return pattern.test(value);
        }, {
          message: '不能以数字开头且不能包含大写字母',
        })
    },
    {
      fieldName: 'type',
      label: '知识库类型',
      component: 'ApiDict',
      componentProps: {
        code: 'knowledge_type',
        placeholder: '请输入知识库标题',
        maxlength: 50,
      },
      formItemClass: 'col-span-12',
      detailSpan: 12,
      rules: 'selectRequired',
    },
    {
      fieldName: 'description',
      label: '知识库简介',
      component: 'Input',
      componentProps: {
        type: 'textarea',
        placeholder: '请输入知识库简介',
        rows: 3,
        maxlength: 500,
        showCount: true,
      },
      formItemClass: 'col-span-12',
      detailSpan: 12,
    },
    {
      fieldName: 'files',
      label: '上传新文件',
      component: 'Upload',
      componentProps: {
        drag: true,
        multiple: true,
        autoUpload: false,
        accept: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt',
        action: '#',
        showUploadList: true,
      },
      renderComponentContent: () => ({
        default: () =>
          h(
            ElIcon,
            {
              class: 'el-icon-upload',
              style:
                'font-size: 48px; color: #409eff; width: 200px;height: 200px',
            },
            () => h(UploadFilled),
          ),
      }),
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
    {
      fieldName: 'chunkSize',
      label: '单段文本最大长度',
      component: 'Slider',
      defaultValue: 1000,
      componentProps: {
        'show-input': true,
        min: 1,
        max: 1000,
        step: 1,
      },
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
    {
      fieldName: '',
      component: '',
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
    {
      fieldName: 'chunkOverlap',
      label: '相邻文本重合长度',
      component: 'Slider',
      defaultValue: 250,
      componentProps: {
        min: 0,
        max: 1000,
        step: 10,
        'show-input': true,
      },
      formItemClass: 'col-span-6',
      detailSpan: 6,
    },
  ],
};
