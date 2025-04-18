import { requestClient } from '#/api/request';

enum Api {
  RoleKnowledgeCreate = '/sys/role-knowledge/create',
  RoleKnowledgeDelete = '/sys/role-knowledge/delete',
  RoleKnowledgeUpdate = '/sys/role-knowledge/update',
  findKnowledgeByRoleId = '/sys/role-knowledge/role',
}

export const sysRoleKnowledgeRemove = (roleId: any) =>
  requestClient.get(Api.RoleKnowledgeDelete + '/' + roleId);

export const sysRoleKnowledgeCreate = (params: any) =>
  requestClient.post(Api.RoleKnowledgeCreate, params);


export const sysfindKnowledgeByRoleId = (roleId: any) =>
  requestClient.get(Api.findKnowledgeByRoleId + '/' + roleId);

export const sysRoleKnowledgeUpdate = (params: any) =>
  requestClient.post(Api.RoleKnowledgeUpdate, params);
