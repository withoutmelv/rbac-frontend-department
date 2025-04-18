<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';

import { computed, markRaw, ref } from 'vue';

import { AuthenticationLogin, ImageCaptcha, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { captcha, getCaptchaOpenFlag } from '#/api/core';
import { useAuthStore } from '#/store';

defineOptions({ name: 'Login' });

const authStore = useAuthStore();
const captchaFlag = ref(true);
const imageCaptchaRef = ref();
getCaptchaOpenFlag().then((res: any) => {
  // 判断是否启用图验证码
  captchaFlag.value = res.flag;
  if (captchaFlag.value) {
    imageCaptchaRef.value?.refresh();
  }
});
const REMEMBER_ME_KEY = `REMEMBER_ME_${location.hostname}`;
const localUser = JSON.parse(localStorage.getItem(REMEMBER_ME_KEY) || '{}');
const defaultUserName = localUser.userName ? localUser.userName : '';
const defaultPassword = localUser.password ? localUser.password : '';
const defaultCode = ['development', 'mock'].includes(import.meta.env.MODE)
  ? '8888'
  : '';
const formSchema = computed((): VbenFormSchema[] => {
  return captchaFlag.value
    ? [
        {
          component: 'VbenInput',
          defaultValue: defaultUserName,
          componentProps: {
            placeholder: $t('authentication.usernameTip'),
          },
          fieldName: 'userName',
          label: $t('authentication.username'),
          rules: z
            .string()
            .min(1, { message: $t('authentication.usernameTip') }),
          formItemClass: 'col-span-12',
        },
        {
          component: 'VbenInputPassword',
          defaultValue: defaultPassword,
          componentProps: {
            placeholder: $t('authentication.password'),
          },
          fieldName: 'password',
          label: $t('authentication.password'),
          rules: z
            .string()
            .min(1, { message: $t('authentication.passwordTip') }),
          formItemClass: 'col-span-12',
        },
        {
          component: 'VbenInput',
          defaultValue: defaultCode,
          componentProps: {
            placeholder: '请输入图片验证码',
          },
          formItemClass: 'col-span-8',
          fieldName: 'code',
          label: '验证码',
          rules: z.string().min(1, { message: '请输入图片验证码' }),
        },
        {
          component: markRaw(ImageCaptcha),
          fieldName: 'uuid',
          componentProps: {
            api: captcha,
            uuidField: 'uuid',
            base64Field: 'base64',
            immediate: false,
            onRegister(obj: any) {
              imageCaptchaRef.value = obj;
            },
          },
          formItemClass: 'col-span-4',
        },
      ]
    : [
        {
          component: 'VbenInput',
          defaultValue: defaultUserName,
          componentProps: {
            placeholder: $t('authentication.usernameTip'),
          },
          fieldName: 'userName',
          label: $t('authentication.username'),
          rules: z
            .string()
            .min(1, { message: $t('authentication.usernameTip') }),
          formItemClass: 'col-span-12',
        },
        {
          component: 'VbenInputPassword',
          defaultValue: defaultPassword,
          componentProps: {
            placeholder: $t('authentication.password'),
          },
          fieldName: 'password',
          label: $t('authentication.password'),
          rules: z
            .string()
            .min(1, { message: $t('authentication.passwordTip') }),
          formItemClass: 'col-span-12',
        },
      ];
});
const handleSubmit = (data: any) => {
  authStore.authLogin(data).catch(() => {
    if (captchaFlag.value) {
      imageCaptchaRef.value?.refresh();
    }
  });
};
</script>

<template>
  <AuthenticationLogin
    :form-schema="formSchema"
    :loading="authStore.loginLoading"
    :show-code-login="false"
    :show-forget-password="false"
    :show-qrcode-login="false"
    :show-register="true"
    :show-remember-me="true"
    :show-third-party-login="false"
    @submit="handleSubmit"
    @guest-login="authStore.guestLogin"
  />
</template>
