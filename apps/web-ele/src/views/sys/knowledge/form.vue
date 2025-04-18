<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { ElMessage as message, ElTable, ElTableColumn, ElButton, ElSpace } from 'element-plus';

import { useVbenForm } from '#/adapter/form';
import { sysKnowledgeAdd, sysKnowledgeUpdate } from '#/api/sys/knowledge';
import {KnowledgeBaseCreate, UpdateKnowledgeBaseInfo, UploadFile, GetFileList, DeleteFile} from '#/api/langChain/knowledge-base';

import { formSchemas } from './schemas';

const record = ref();
const isUpdate = ref(false);
const gridApi = ref();
const tableData = ref([]);

const [KnowledgeForm, formApi] = useVbenForm({
  showDefaultActions: false,
  ...formSchemas,
});

const [Modal, modalApi] = useVbenModal({
  onOpenChange(isOpen) {
    isUpdate.value = modalApi.getData()?.isUpdate ?? false;
    record.value = isOpen ? modalApi.getData()?.record || {} : {};
    gridApi.value = isOpen ? modalApi.getData()?.gridApi : null;
    if (isOpen && isUpdate.value) {
      formApi.setValues(record.value);
      handleGetFileList(record.value.name);
    }
  },
  onConfirm() {
    formApi.validate().then(async (e: any) => {
      if (e.valid) {
        const values = await formApi.getValues();
        modalApi.setState({ loading: true, confirmLoading: true });
        console.log("values", values);
        // 新增知识库
        if (!isUpdate.value) {
          await KnowledgeBaseCreate({
            knowledge_base_name: values.name,
          });
        }
        const submitApi = isUpdate.value ? sysKnowledgeUpdate : sysKnowledgeAdd;
        values.fileCount = (values?.files?.length || 0) + tableData.value.length;
        values.id = record.value.id;
        await submitApi(values)

        // 更新知识库简介
        values.description && await UpdateKnowledgeBaseInfo({
          knowledge_base_name: values.name,
          kb_info: values.description
        });

        // 上传文件
        if (values.files && values.files.length > 0) {
          const formData = new FormData();
          formData.append('knowledge_base_name', values.name);
          formData.append('chunk_size', values.chunkSize);
          formData.append('chunk_overlap', values.chunkOverlap);
          formData.append('docs', JSON.stringify({
            "test.txt": [
              {
                "metadata": {},
                "page_content": "custom doc",
                "type": "Document"
              }
            ]
          }));
          values.files.forEach((item: { raw: File }) => {
            formData.append('files', item.raw)
          })
          console.log("formData", formData);
          await UploadFile(formData)
        }
        message.success('保存成功');
        gridApi.value?.reload();
        modalApi.close();
        modalApi.setState({ loading: false, confirmLoading: false });
      }
    });
  },
});

const handleGetFileList = async (name: any) => {
  const data = await GetFileList(name);
  tableData.value = data || [];
};

const handleDelete = (row: any) => {
  DeleteFile({
    knowledge_base_name: record.value.name,
    file_names: [row.file_name],
    delete_content: false,
    not_refresh_vs_cache: false
  }).then(() => {
    message.success('删除成功');
    handleGetFileList(record.value.name);
  })
};

defineExpose(modalApi);
</script>

<template>
  <Modal :title="isUpdate ? '编辑知识库' : '新增知识库'" class="w-[60%]">
    <div class="common-form">
      <KnowledgeForm />
      <div class="mt-4">
        <h4 class="mb-2">知识库已有文件</h4>
        <ElTable :data="tableData" border size="small">
          <ElTableColumn type="index" label="序号" width="60" align="center" />
          <ElTableColumn prop="file_name" label="名称"  />
          <ElTableColumn prop="document_loader" label="知识加载器" width="200" />
          <ElTableColumn prop="text_splitter" label="分词器" width="200" />
          <ElTableColumn prop="docs_count" label="知识数量" width="120" />
          <ElTableColumn label="操作" width="120">
            <template #default="scope">
              <ElSpace>
                <ElButton type="danger" text size="small" @click="handleDelete(scope.row)">删除</ElButton>
              </ElSpace>
            </template>
          </ElTableColumn>
        </ElTable>
      </div>
    </div>
  </Modal>
</template>

<style scoped lang="less">
@import '#/assets/styles/common-form.less';
</style>
