<script lang="ts" setup>
import type { NotificationItem } from '@vben/layouts';

import { computed, h, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { AuthenticationLoginExpiredModal } from '@vben/common-ui';
import { useTabs, useWatermark } from '@vben/hooks';
import { BookOpenText, CircleHelp, SvgGiteeIcon } from '@vben/icons';
import {
  BasicLayout,
  LockScreen,
  Notification,
  UserDropdown,
} from '@vben/layouts';
import { preferences } from '@vben/preferences';
import { useAccessStore, useUserStore } from '@vben/stores';
import { openWindow } from '@vben/utils';

import { ElMessage } from 'element-plus';

import { unPlayUser } from '#/api/sys/user';
import { Icon } from '#/components/icon';
import { $t } from '#/locales';
import { useAuthStore } from '#/store';
import LoginForm from '#/views/_core/authentication/login.vue';

const notifications = ref<NotificationItem[]>([
  
]);

const userStore = useUserStore();
const authStore = useAuthStore();
const accessStore = useAccessStore();
const router = useRouter();
const { destroyWatermark, updateWatermark } = useWatermark();
const showDot = computed(() =>
  notifications.value.some((item) => !item.isRead),
);

const menus = computed(() => [
  {
    handler: () => {
      router.push({
        name: 'sys:personal',
      });
    },
    icon: () => {
      return h(Icon, {
        icon: 'User',
      });
    },
    text: '个人中心',
  },
]);

const avatar = computed(() => {
  return userStore.userInfo?.avatar ?? '';
});

async function handleLogout() {
  await authStore.logout(false);
}
function handleLogoutPlay() {
  unPlayUser({}).then((data) => {
    accessStore.setAccessToken(data.token);
    accessStore.setRefreshToken(data.refreshToken);
    ElMessage.success('退出扮演成功！');
    const { closeCurrentTab } = useTabs();
    closeCurrentTab();
    setTimeout(() => {
      location.reload();
    }, 600);
  });
}
function handleNoticeClear() {
  notifications.value = [];
}

function handleMakeAll() {
  notifications.value.forEach((item) => (item.isRead = true));
}
watch(
  () => preferences.app.watermark,
  async (enable) => {
    if (enable) {
      await updateWatermark({
        content: `${userStore.userInfo?.username}`,
      });
    } else {
      destroyWatermark();
    }
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <BasicLayout @clear-preferences-and-logout="handleLogout">
    <template #user-dropdown>
      <UserDropdown
        :avatar="`${avatar}?time=${new Date().getTime()}`"
        :menus
        :text="userStore.userInfo?.realName"
        :description="userStore.userInfo?.email"
        :tag-text="userStore.userInfo?.roleNames[0]"
        @logout="handleLogout"
        @logout-play="handleLogoutPlay"
      />
    </template>
    <template #notification>
      <Notification
        :dot="showDot"
        :notifications="notifications"
        @clear="handleNoticeClear"
        @make-all="handleMakeAll"
      />
    </template>
    <template #extra>
      <AuthenticationLoginExpiredModal
        v-model:open="accessStore.loginExpired"
        :avatar
      >
        <LoginForm />
      </AuthenticationLoginExpiredModal>
    </template>
    <template #lock-screen>
      <LockScreen :avatar @to-login="handleLogout" />
    </template>
  </BasicLayout>
</template>
