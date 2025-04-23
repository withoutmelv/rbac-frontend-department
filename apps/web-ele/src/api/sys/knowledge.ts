import { requestClient } from '#/api/request';
import {useUserStore} from '@vben/stores';

const userStore = useUserStore() as any;

enum Api {
  KnowledgePage = '/sys/knowledge/page',
  KnowledgeAdd = '/sys/knowledge/save',
  KnowledgeUpdate = '/sys/knowledge/update',
  KnowledgeDelete = '/sys/knowledge/delete',
  KnowledgeDetail = '/sys/knowledge/detail',
}

export const sysKnowledgePage = (params?: any) =>
  requestClient.post(Api.KnowledgePage, {...params, isAdmin: userStore.isAdmin});

export const sysKnowledgeList = (params?: any) =>
  requestClient.post(Api.KnowledgePage, {...params});

export const sysKnowledgeRemove = (params: any) =>
  requestClient.post(Api.KnowledgeDelete, params);

export const sysKnowledgeAdd = (params: any) =>
  requestClient.post(Api.KnowledgeAdd, params);
export const sysKnowledgeUpdate = (params: any) =>
  requestClient.post(Api.KnowledgeUpdate, params);
export const sysKnowledgeDetail = (params: any) =>
  requestClient.post(Api.KnowledgeDetail, params);
