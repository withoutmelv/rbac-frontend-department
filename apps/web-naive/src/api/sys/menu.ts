import { requestClient } from '#/api/request';

/**
 * 获取菜单树
 * @param data
 */
export async function sysMenuTree(data: any) {
  return requestClient.post<any>('/sys/menu/tree', data);
}
/**
 * 获取菜单列表
 * @param data
 */
export async function sysMenuList(data: any) {
  return requestClient.post<any>('/sys/menu/list', data);
}
/**
 * 添加菜单
 * @param data 参数
 */
export async function sysMenuSave(data: any) {
  return requestClient.post('/sys/menu/save', data);
}
/**
 * 修改菜单
 * @param data 参数
 */
export async function sysMenuUpdate(data: any) {
  return requestClient.post('/sys/menu/update', data);
}
/**
 * 删除菜单
 * @param data 参数
 */
export async function sysMenuRemove(data: any) {
  return requestClient.post('/sys/menu/remove', data);
}
/**
 * 菜单详情
 * @param data 参数
 */
export async function sysMenuDetail(data: any) {
  return requestClient.post('/sys/menu/detail', data);
}
