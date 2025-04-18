<script setup lang="ts">
import { h, ref } from 'vue';

import { ElButton as Button, ElMessage as message } from 'element-plus';

import { useVbenForm, z } from '#/adapter/form';
import { updatePwd } from '#/api/sys/user';

const loading = ref<boolean>(false);

const [BasicForm, formApi] = useVbenForm({
  wrapperClass: 'grid-cols-1 w-[60%]', // 24栅格,
  commonConfig: {
    formItemClass: 'col-span-1',
    labelWidth: 100,
  },
  showDefaultActions: false,
  submitButtonOptions: {
    content: '更新信息',
  },
  resetButtonOptions: {
    show: false,
  },
  schema: [
    {
      fieldName: 'password',
      label: '旧密码',
      component: 'Input',
      componentProps: {
        type: 'password',
        showPassword: true,
        placeholder: '请输入旧密码',
      },
      formItemClass: 'col-span-1',
      rules: 'required',
    },
    {
      fieldName: 'newPassword',
      label: '新密码',
      help: '5-18位数字、字母、特殊字符组成。',
      component: 'Input',
      componentProps: {
        type: 'password',
        showPassword: true,
        placeholder: '请输入新密码',
      },
      formItemClass: 'col-span-1',
      rules: z
        .string()
        .regex(/[\w!@#$%^&*]{5,18}/, '密码由5-18位数字、字母、特殊字符组成。'),
    },
    {
      fieldName: 'confirmPassword',
      label: '确认密码',
      help: '5-18位数字、字母、特殊字符组成。',
      component: 'Input',
      componentProps: {
        type: 'password',
        showPassword: true,
        placeholder: '请输入确认密码',
      },
      formItemClass: 'col-span-1',
      rules: z
        .string()
        .regex(/[\w!@#$%^&*]{5,18}/, '密码由5-18位数字、字母、特殊字符组成。'),
      dependencies: {
        triggerFields: ['confirmPassword'],
        rules: (values) => {
          return z
            .string()
            .regex(
              /[\w!@#$%^&*]{5,18}/,
              '密码由5-18位数字、字母、特殊字符组成。',
            )
            .refine(
              (confirmPassword) => {
                return confirmPassword === values.newPassword;
              },
              {
                message: '确认密码必须与密码一致',
              },
            );
        },
      },
    },
    {
      fieldName: 'btn',
      label: '',
      component: () => {
        return h(
          'div',
          {},
          h(
            Button,
            {
              type: 'primary',
              // eslint-disable-next-line no-use-before-define
              onClick: handleSubmit.bind(null),
              loading: loading.value,
            },
            {
              default() {
                return '修改密码';
              },
            },
          ),
        );
      },
      componentProps: {},
      formItemClass: 'col-span-1',
    },
  ],
});
const handleSubmit = () => {
  formApi.validate().then(async (e: any) => {
    if (e.valid) {
      const values = await formApi.getValues();
      loading.value = true;
      updatePwd(values)
        .then(() => {
          message.success('保存成功');
          formApi.resetForm();
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
};
defineExpose({
  getFormApi() {
    return formApi;
  },
});
</script>
<template>
  <BasicForm />
</template>
<style lang="less" scoped></style>
