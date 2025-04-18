<script setup lang="ts">
import { h, onMounted, ref } from 'vue';

import { useUserStore } from '@vben/stores';

import { ElButton as Button, ElMessage as message } from 'element-plus';

import { useVbenForm } from '#/adapter/form';
import { updateInfo } from '#/api/sys/user';

const userStore = useUserStore();
const loading = ref<boolean>(false);

const [BasicForm, formApi] = useVbenForm({
  wrapperClass: 'grid-cols-1 w-[50%]', // 24栅格,
  commonConfig: {
    formItemClass: 'col-span-1',
    labelWidth: 60,
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
      fieldName: 'realName',
      label: '姓名',
      component: 'Input',
      componentProps: {
        placeholder: '请输入姓名',
      },
      formItemClass: 'col-span-1',
      rules: 'required',
    },
    {
      fieldName: 'sex',
      label: '性别',
      component: 'ApiDict',
      defaultValue: 3,
      componentProps: {
        placeholder: '请选择性别',
        code: 'sex',
        isBtn: true,
        renderType: 'RadioGroup',
      },
      formItemClass: 'col-span-1',
      rules: 'required',
    },
    {
      fieldName: 'nickName',
      label: '昵称',
      component: 'Input',
      componentProps: {
        placeholder: '请输入昵称',
      },
      formItemClass: 'col-span-1',
    },
    {
      fieldName: 'email',
      label: '邮箱',
      component: 'Input',
      componentProps: {
        placeholder: '请输入邮箱',
      },
      formItemClass: 'col-span-1',
    },
    {
      fieldName: 'tel',
      label: '电话',
      component: 'Input',
      componentProps: {
        placeholder: '请输入电话',
      },
      formItemClass: 'col-span-1',
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
                return '更新信息';
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
      updateInfo(values)
        .then(() => {
          message.success('保存成功');
          userStore.setUserInfo({
            ...userStore.userInfo,
            ...values,
          } as any);
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
};
onMounted(() => {
  formApi.setValues(userStore.userInfo || {});
});
</script>
<template>
  <BasicForm />
</template>
<style lang="less" scoped></style>
