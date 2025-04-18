import { requestClient } from '#/api/request';

/**
 * 分页查询字典项列表
 * @param data
 */
export async function sysDictItemPage(data: any) {
  return requestClient.post<any>('/sys/dictItem/page', data);
}
/**
 * 添加字典项
 * @param data 参数
 */
export async function sysDictItemSave(data: any) {
  return requestClient.post('/sys/dictItem/save', data);
}
/**
 * 修改字典项
 * @param data 参数
 */
export async function sysDictItemUpdate(data: any) {
  return requestClient.post('/sys/dictItem/update', data);
}
/**
 * 删除字典项
 * @param data 参数
 */
export async function sysDictItemRemove(data: any) {
  return requestClient.post('/sys/dictItem/remove', data);
}
/**
 * 字典项详情
 * @param data 参数
 */
export async function sysDictItemDetail(data: any) {
  return requestClient.post('/sys/dictItem/detail', data);
}
