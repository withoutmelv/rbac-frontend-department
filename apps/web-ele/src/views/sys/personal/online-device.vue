<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';

import {
  useVbenVxeGrid,
  type VxeGridListeners,
  type VxeGridProps,
} from '#/adapter/vxe-table';
import { kickoutByTokenValue, onlineDevice } from '#/api/sys/user';
import { TableAction } from '#/components/table-action';

const dataSource = ref([]);
const handlePage = (params: any) => {
  const { pageNum, pageSize } = params;
  return Promise.resolve({
    recordCount: dataSource.value.length,
    totalPage: Math.ceil(dataSource.value.length / pageSize),
    rows: dataSource.value.slice((pageNum - 1) * pageSize, pageNum * pageSize),
  });
};
const gridOptions = reactive<VxeGridProps<any>>({
  toolbarConfig: {
    enabled: true,
    refresh: {
      queryMethod() {
        // eslint-disable-next-line no-use-before-define
        requestData();
        return Promise.resolve([]);
      },
    }, // 刷新
    print: false, // 打印
    export: false, // 导出
    custom: true, // 自定义列
    zoom: true, // 最大化最小化
    slots: {
      buttons: 'toolbar-buttons',
    },
  },
  columns: [
    { field: 'device', title: '登录设备' },
    { field: 'userName', title: '登录账号' },
    { field: 'loginBrowser', title: '浏览器' },
    { field: 'loginIp', title: '登录IP' },
    { field: 'loginTime', title: '登录时间' },
    {
      width: 100,
      title: '操作',
      align: 'center',
      slots: { default: 'ACTION' },
      fixed: 'right',
    },
  ],
  data: [],
  border: false,
  height: '330',
  keepSource: true,
  pagerConfig: {
    pageSize: 5,
  },
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await handlePage({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
});
const gridEvents: VxeGridListeners<any> = {};
const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
  gridEvents,
});
const requestData = () => {
  onlineDevice({}).then((res) => {
    dataSource.value = res;
    gridApi.reload();
  });
};
onMounted(() => {
  requestData();
});
const handleDelete = (row: any) => {
  kickoutByTokenValue({
    ids: [row.tokenValue],
  }).then(() => {
    requestData();
  });
};
</script>
<template>
  <div>
    <Grid>
      <template #toolbar-buttons> 我的在线设备 </template>
      <template #ACTION="{ row }">
        <TableAction
          :actions="[
            {
              label: '踢下线',
              icon: 'ant-design:delete-outlined',
              link: true,
              popConfirm: {
                title: '确定踢下线吗？',
                confirm: handleDelete.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </Grid>
  </div>
</template>
<style lang="less" scoped></style>
