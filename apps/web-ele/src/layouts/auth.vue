<script lang="ts" setup>
import { computed } from 'vue';

import { AuthPageLayout } from '@vben/layouts';
import { preferences } from '@vben/preferences';
import logo from '#/assets/images/logo.png'

import { $t } from '#/locales';

// const appName = computed(() => preferences.app.name);
// const logo = computed(() => preferences.logo.source);
</script>

<template>
  <AuthPageLayout
    app-name="deepseek AI应用赋能平台"
    :logo="logo"
    page-description="CopyRight © 2025"
    page-title="deepseek AI应用赋能平台"
  >
    <!-- 自定义工具栏 -->
    <!-- <template #toolbar></template> -->
  </AuthPageLayout>
</template>
