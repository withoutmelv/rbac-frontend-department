import { requestClient } from '#/api/request';

/**
 * 获取部门列表
 * @param data
 */
export async function sysDeptList(data: any) {
  return requestClient.post<any>('/sys/dept/list', data);
}
/**
 * 添加部门
 * @param data 参数
 */
export async function sysDeptSave(data: any) {
  return requestClient.post('/sys/dept/save', data);
}
/**
 * 修改部门
 * @param data 参数
 */
export async function sysDeptUpdate(data: any) {
  return requestClient.post('/sys/dept/update', data);
}
/**
 * 删除部门
 * @param data 参数
 */
export async function sysDeptRemove(data: any) {
  return requestClient.post('/sys/dept/remove', data);
}
/**
 * 部门详情
 * @param data 参数
 */
export async function sysDeptDetail(data: any) {
  return requestClient.post('/sys/dept/detail', data);
}
