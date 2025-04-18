<script setup lang="ts">
import type { DescItem } from '#/components/description';

import { h, ref } from 'vue';

import { Page } from '@vben/common-ui';
import { useUserStore } from '@vben/stores';

import { Card, Space, TabPane, Tabs, Tag } from 'ant-design-vue';

import { Description } from '#/components/description';

import OnlineDevice from './online-device.vue';
import UpdateAvatar from './update-avatar.vue';
import UpdateInfo from './update-info.vue';
import UpdatePassword from './update-password.vue';

const updatePasswordRef = ref();
const userStore = useUserStore();
const schema: DescItem[] = [
  {
    field: 'userName',
    label: '用户名',
    component: 'Input',
    span: 12,
  },
  {
    field: 'nickName',
    label: '昵称',
    component: 'Input',
    span: 12,
  },
  {
    field: 'mobilePhone',
    label: '手机号码',
    component: 'Input',
    span: 12,
  },
  {
    field: 'tel',
    label: '联系电话',
    component: 'Input',
    span: 12,
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
    span: 12,
  },
  {
    field: 'deptName',
    label: '所属部门',
    component: 'Input',
    span: 12,
  },
  {
    field: 'roleNames',
    label: '所属角色',
    component: '',
    render: (val) => {
      if (!val) return h('span');
      return h(
        Space,
        {
          wrap: true,
          size: 'small',
          class: 'pb-[8px]',
        },
        {
          default: () => {
            return val.map((item: any) => {
              return h(
                Tag,
                {
                  color: 'blue',
                },
                {
                  default() {
                    return item;
                  },
                },
              );
            });
          },
        },
      );
    },
    span: 12,
  },
  {
    field: 'lastLoginTime',
    label: '上次登录时间',
    component: 'Input',
    span: 12,
  },
];
const handleChange = (key: any) => {
  if (key === '2') {
    // 重置校验
    updatePasswordRef.value?.getFormApi()?.resetValidate();
  }
};
</script>
<template>
  <Page>
    <div class="grid grid-cols-3 gap-4">
      <Card class="col-span-1">
        <div class="flex justify-center">
          <UpdateAvatar :avatar="userStore.userInfo?.avatar" />
        </div>
        <div class="flex justify-center p-[8px]">
          {{ userStore.userInfo?.realName }}
        </div>
        <Description
          :data="userStore.userInfo || {}"
          :schema="schema"
          size="small"
        />
      </Card>
      <Card class="col-span-2">
        <Tabs @change="handleChange">
          <TabPane key="1" tab="基本设置">
            <UpdateInfo />
          </TabPane>
          <TabPane key="2" tab="修改密码">
            <UpdatePassword ref="updatePasswordRef" />
          </TabPane>
          <TabPane key="3" tab="在线设备">
            <OnlineDevice />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  </Page>
</template>
<style lang="less" scoped></style>
