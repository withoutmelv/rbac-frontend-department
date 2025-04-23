<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import {
  ElButton,
  ElSpace,
  ElTable,
  ElTableColumn,
  ElMessage as message,
} from 'element-plus';

import { useVbenForm } from '#/adapter/form';
import {
  DeleteFile,
  GetFileList,
  KnowledgeBaseCreate,
  UpdateKnowledgeBaseInfo,
  UploadFile,
} from '#/api/langChain/knowledge-base';
import { sysKnowledgeAdd, sysKnowledgeUpdate } from '#/api/sys/knowledge';

import { formSchemas } from './schemas';
import { useUserStore } from '@vben/stores';

const record = ref();
const isUpdate = ref(false);
const gridApi = ref();
const tableData = ref([]);
const userStore = useUserStore();

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
      formApi.updateSchema([
        {
          fieldName: 'name',
          componentProps: {
            disabled: true,
          },
        },
      ]);
      if (!userStore.isAdmin) {
        formApi.updateSchema([
          {
            fieldName: 'deptId',
            componentProps: {
              disabled: true,
            },
          },
        ]);
      }
      formApi.setValues(record.value);
      handleGetFileList(record.value.name);
    } else {
      formApi.updateSchema([
        {
          fieldName: 'name',
          componentProps: {
            disabled: false,
          },
        },
      ]);
      if (!userStore.isAdmin) {
        formApi.updateSchema([
          {
            fieldName: 'deptId',
            defaultValue: userStore?.userInfo?.deptId,
            componentProps: {
              disabled: true,
            },
          },
        ]);
      }
    }
  },
  onConfirm() {
    formApi.validate().then(async (e: any) => {
      if (e.valid) {
        const values = await formApi.getValues();
        modalApi.setState({ loading: true, confirmLoading: true });
        // 新增知识库
        if (!isUpdate.value) {
          await KnowledgeBaseCreate({
            knowledge_base_name: values.name,
          });
        }

        // 更新知识库简介
        values.description &&
          (await UpdateKnowledgeBaseInfo({
            knowledge_base_name: values.name,
            kb_info: values.description,
          }));

        // 删除文件
        if (tableData.value.length > 0) {
          const file_names = tableData.value
            .filter((item: any) => item.isDeleted)
            .map((item: any) => item.file_name);
          file_names.length > 0 &&
            (await handleDelete(file_names, values.name));
        }

        // 上传文件
        if (values.files && values.files.length > 0) {
          const formData = new FormData();
          formData.append('knowledge_base_name', values.name);
          formData.append('chunk_size', values.chunkSize);
          formData.append('chunk_overlap', values.chunkOverlap);
          formData.append(
            'docs',
            JSON.stringify({
              'test.txt': [
                {
                  metadata: {},
                  page_content: 'custom doc',
                  type: 'Document',
                },
              ],
            }),
          );
          values.files.forEach((item: { raw: File }) => {
            formData.append('files', item.raw);
          });
          await UploadFile(formData);
        }

        // 更新权限系统的知识库
        const submitApi = isUpdate.value ? sysKnowledgeUpdate : sysKnowledgeAdd;
        values.fileCount = await getFileCount(values.name);
        values.id = record.value.id;
        await submitApi(values);
        message.success('保存成功');
        gridApi.value?.reloadTable();
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

const handleDelete = async (file_names: any, kb_name: string) => {
  await DeleteFile({
    knowledge_base_name: kb_name,
    file_names,
    delete_content: true,
    not_refresh_vs_cache: false,
  });
};

const getFileCount = async (name: any) => {
  const data = await GetFileList(name);
  return data?.length || 0;
};

defineExpose(modalApi);
</script>

<template>
  <Modal :title="isUpdate ? '编辑知识库' : '新增知识库'" class="w-[60%]">
    <div class="common-form">
      <KnowledgeForm />
      <div class="mt-4">
        <h4 class="mb-2">知识库已有文件</h4>
        <ElTable
          :data="tableData.filter((item) => !(item as any).isDeleted)"
          border
          size="small"
        >
          <ElTableColumn type="index" label="序号" width="60" align="center" />
          <ElTableColumn prop="file_name" label="名称" />
          <ElTableColumn
            prop="document_loader"
            label="知识加载器"
            width="200"
          />
          <ElTableColumn prop="text_splitter" label="分词器" width="200" />
          <ElTableColumn prop="docs_count" label="知识数量" width="120" />
          <ElTableColumn label="操作" width="120">
            <template #default="{ row }">
              <ElSpace>
                <ElButton
                  type="danger"
                  text
                  size="small"
                  @click="() => (row.isDeleted = true)"
                >
                  删除
                </ElButton>
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
