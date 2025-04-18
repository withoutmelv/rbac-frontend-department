import { requestClient } from '#/api/request';

/**
 * 分页查询角色列表
 * @param data
 */
export async function sysRolePage(data: any) {
  return requestClient.post<any>('/sys/role/page', data);
}
/**
 * 添加角色
 * @param data 参数
 */
export async function sysRoleSave(data: any) {
  return requestClient.post('/sys/role/save', data);
}
/**
 * 修改角色
 * @param data 参数
 */
export async function sysRoleUpdate(data: any) {
  return requestClient.post('/sys/role/update', data);
}
/**
 * 删除角色
 * @param data 参数
 */
export async function sysRoleRemove(data: any) {
  return requestClient.post('/sys/role/remove', data);
}
/**
 * 角色
 * @param data 参数
 */
export async function sysRoleDetail(data: any) {
  return requestClient.post('/sys/role/detail', data);
}
