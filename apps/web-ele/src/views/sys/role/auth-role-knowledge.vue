<script lang="ts" setup>
import { ref } from 'vue';
import { useVbenDrawer } from '@vben/common-ui';
import { ElTable as Table, ElTableColumn as TableColumn, ElMessage as message } from 'element-plus';
import { sysKnowledgeList } from '#/api/sys/knowledge';
import { sysRoleKnowledgeUpdate, sysfindKnowledgeByRoleId } from '#/api/sys/role-knowledge';
import { typeMap } from '#/constant/knowledge';

const [Drawer, DrawerApi] = useVbenDrawer({
  onOpenChange(isOpen) {
    record.value = isOpen ? DrawerApi.getData()?.record : {};
    if (isOpen) {
      loadKnowledge();
    }
  },
  onConfirm() {
    // 保存授权逻辑
    const knowledgeIds = selectedRows.value.map(row => (row as any).id);
    console.log('选中的知识库ID：', knowledgeIds);
    // 保存授权逻辑
    sysRoleKnowledgeUpdate({
      roleId: record.value.id,
      knowledgeIds,
    }).then(() => {
      message.success('授权成功');
      DrawerApi.close();
    });
  }
});
const knowledgeList = ref([]);
const record = ref();
const selectedRows = ref([]); // 新增：用于存储选中的行
const knowledgeTable = ref(); // 新增：用于获取表格实例

const loadKnowledge = async () => {
  const data = await sysKnowledgeList({
    current: 1,
    size: 9999,
    deptId: record.value.deptId,
  });
  if (data.rows) {
    knowledgeList.value = data.rows;
  }

  // 查询当前角色已授权的知识库
  const responseData = await sysfindKnowledgeByRoleId(record.value.id);
  console.log('当前角色已授权的知识库', responseData);
  if (responseData) {
    const authorizedKnowledgeIds = responseData.map((item: {id: string}) => item.id);
    knowledgeList.value.forEach(item => {
      // 标记已授权的知识库
      console.log('item', item, authorizedKnowledgeIds.includes((item as {id: string}).id));
      knowledgeTable.value.toggleRowSelection(item, authorizedKnowledgeIds.includes((item as {id: string}).id));
    });
  }
};

defineExpose(DrawerApi);
</script>

<template>
  <div>
    <Drawer class="w-[60%]" title="知识库授权">
      <div class="flex flex-col h-full p-4">
        <Table 
          :data="knowledgeList" 
          ref="knowledgeTable"
          row-key="id"
          highlight-current-row
          stripe
          border 
          style="width: 100%; height: 100%"
          @selection-change="(rows) => selectedRows = rows"
        >
          <TableColumn type="selection" width="55" />
          <TableColumn prop="id" label="ID" width="200" />
          <TableColumn prop="name" label="知识库名称" width="200" />
          <TableColumn prop="type" label="类型">
            <template #default="scope">
              {{ typeMap[scope.row.type] || scope.row.type }}
            </template>
          </TableColumn>
        </Table>
      </div>
    </Drawer>
  </div>
</template>
