import { requestClient } from '#/api/request';

enum Api {
  KnowledgeBaseCreate = '/knowledge_base/create_knowledge_base',
  KnowledgeBaseDelete = '/knowledge_base/delete_knowledge_base',
  UpdateKnowledgeBaseInfo = '/knowledge_base/update_info',
  GetFileList = '/knowledge_base/get_kb_file_details',
  UploadFile = '/knowledge_base/upload_docs',
  DeleteFile = '/knowledge_base/delete_docs',
  DownloadFile = '/knowledge_base/download_docs',
  
}

export const KnowledgeBaseCreate = (data: any) =>
  requestClient.post(Api.KnowledgeBaseCreate, 
    {
      ...data, 
      vector_store_type: import.meta.env.VITE_VECTOR_STORE_TYPE,
      embed_model: import.meta.env.VITE_EMBED_MODEL,
    });

export const KnowledgeBaseDelete = (params: any) =>
  requestClient.post(Api.KnowledgeBaseDelete, params);

export const UpdateKnowledgeBaseInfo = (params: any) =>
  requestClient.post(Api.UpdateKnowledgeBaseInfo, params);

export const GetFileList = (kb_name: string) =>
  requestClient.post(Api.GetFileList, { kb_name }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

export const UploadFile = (params: any) =>
  requestClient.post(Api.UploadFile, params, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

export const DeleteFile = (params: any) =>
  requestClient.post(Api.DeleteFile, params);

export const DownloadFile = (params: any) =>
  requestClient.post(Api.DownloadFile, params);
