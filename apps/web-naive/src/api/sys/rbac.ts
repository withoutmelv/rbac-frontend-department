import { requestClient } from '#/api/request';

/**
 * 根据角色ID获取菜单ID集合
 * @param data
 */
export async function roleMenuIds(data: any) {
  return requestClient.post<any>('/sys/rbac/roleMenuIds', data);
}
/**
 * 保存角色菜单关系
 * @param data
 */
export async function saveRoleMenu(data: any) {
  return requestClient.post<any>('/sys/rbac/saveRoleMenu', data);
}
/**
 * 通过角色ID获取用户列表
 * @param data
 */
export async function userListByRoleId(data: any) {
  return requestClient.post<any>('/sys/rbac/userListByRoleId', data);
}
/**
 * 删除用户角色关系
 * @param data
 */
export async function removeUserRole(data: any) {
  return requestClient.post<any>('/sys/rbac/removeUserRole', data);
}
/**
 * 获取用户列表-排除指定角色
 * @param data
 */
export async function userListExcludeRoleId(data: any) {
  return requestClient.post<any>('/sys/rbac/userListExcludeRoleId', data);
}
/**
 * 添加用户角色关系
 * @param data
 */
export async function saveUserRole(data: any) {
  return requestClient.post<any>('/sys/rbac/saveUserRole', data);
}
