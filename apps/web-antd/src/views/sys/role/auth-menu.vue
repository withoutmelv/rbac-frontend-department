<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { Button, message, Tree } from 'ant-design-vue';

import { sysMenuTree } from '#/api/sys/menu';
import { roleMenuIds, saveRoleMenu } from '#/api/sys/rbac';
import { $t } from '#/locales';
import { getAllNodeIds, getLeafNodeIds } from '#/util/tool';

const record = ref();
const treeRef = ref();
const treeData = ref([]);
const isExpand = ref(false);

// 勾选的key
const checkedKeys = ref([]);
// 提交的勾选的key,会进行特殊处理，包含半勾状态的父节点halfCheckedKeys
const submitCheckedKeys = ref<any>([]);
// 所有叶子节点key
const leafKeys = ref<any>([]);
// 所有节点key
const allNodeIds = ref([]);
// 当前展开的key
const currentExpandedKeys = ref([]);
/**
 * api请求成功回调
 */
const handleFetchSuccess = () => {
  roleMenuIds({
    roleId: record.value.id,
    // appCode: props.appCode,
  }).then((res: any) => {
    // 设置的勾选节点只能为叶子节点
    checkedKeys.value = res.filter((item: any) => {
      return leafKeys.value.includes(item);
    });
    submitCheckedKeys.value = res;
  });
};
const [Drawer, DrawerApi] = useVbenDrawer({
  onOpenChange(isOpen) {
    record.value = isOpen ? DrawerApi.getData()?.record : {};
    if (isOpen) {
      DrawerApi.setState({
        loading: true,
      });
      sysMenuTree({
        filterByUser: 1,
      })
        .then((res) => {
          treeData.value = res;
          leafKeys.value = getLeafNodeIds(res);
          allNodeIds.value = getAllNodeIds(res);
          handleFetchSuccess();
        })
        .finally(() => {
          DrawerApi.setState({
            loading: false,
          });
        });
    }
  },
  onConfirm() {
    const roleMenus = submitCheckedKeys.value.map((item: any) => {
      return {
        roleId: record.value.id,
        menuId: item,
      };
    });
    if (roleMenus.length === 0) {
      roleMenus.push({
        roleId: record.value.id,
      });
    }
    DrawerApi.setState({
      loading: true,
      confirmLoading: true,
    });
    saveRoleMenu(roleMenus)
      .then(() => {
        message.success('保存成功');
      })
      .finally(() => {
        DrawerApi.setState({
          loading: false,
          confirmLoading: false,
        });
      });
  },
});
/**
 * 点击复选框触发处理
 * @param mCheckedKeys
 */
const handleCheck = (mCheckedKeys: any, e: any) => {
  checkedKeys.value = mCheckedKeys;
  // 提交的时候需要将半选的父节点也提交上
  submitCheckedKeys.value = [...mCheckedKeys, ...e.halfCheckedKeys];
};
// 展开折叠事件
const handleExpand = (expandedKeys: any) => {
  currentExpandedKeys.value = expandedKeys;
};
// 展开折叠按钮事件
const handleExpandAndCollapse = () => {
  isExpand.value = !isExpand.value;
  currentExpandedKeys.value = isExpand.value ? allNodeIds.value : [];
};
defineExpose(DrawerApi);
</script>
<template>
  <div>
    <Drawer class="w-[60%]" title="授权菜单">
      <Button type="primary" @click="handleExpandAndCollapse">
        {{ isExpand ? '折叠' : '展开' }}
      </Button>
      <Tree
        ref="treeRef"
        v-model:checked-keys="checkedKeys"
        :expanded-keys="currentExpandedKeys"
        :field-names="{
          title: 'name',
          key: 'id',
        }"
        :show-line="true"
        :tree-data="treeData"
        checkable
        @check="handleCheck"
        @expand="handleExpand"
      >
        <template #title="{ name }">{{ $t(name) }}</template>
      </Tree>
    </Drawer>
  </div>
</template>
