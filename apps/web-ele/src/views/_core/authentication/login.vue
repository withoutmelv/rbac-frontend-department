<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';

import { computed } from 'vue';

import { AuthenticationLogin, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { useAuthStore } from '#/store';

defineOptions({ name: 'Login' });

const authStore = useAuthStore();

const REMEMBER_ME_KEY = `REMEMBER_ME_${location.hostname}`;
const localUserName = localStorage.getItem(REMEMBER_ME_KEY) || '';

const formSchema = computed((): VbenFormSchema[] => {
  return [
        {
          component: 'VbenInput',
          defaultValue: localUserName,
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
  authStore.authLogin(data);
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
