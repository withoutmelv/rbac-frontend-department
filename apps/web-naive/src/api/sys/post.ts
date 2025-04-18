import { requestClient } from '#/api/request';

/**
 * 分页查询岗位列表
 * @param data
 */
export async function sysPostPage(data: any) {
  return requestClient.post<any>('/sys/post/page', data);
}
/**
 * 添加岗位
 * @param data 参数
 */
export async function sysPostSave(data: any) {
  return requestClient.post('/sys/post/save', data);
}
/**
 * 修改岗位
 * @param data 参数
 */
export async function sysPostUpdate(data: any) {
  return requestClient.post('/sys/post/update', data);
}
/**
 * 删除岗位
 * @param data 参数
 */
export async function sysPostRemove(data: any) {
  return requestClient.post('/sys/post/remove', data);
}
/**
 * 岗位详情
 * @param data 参数
 */
export async function sysPostDetail(data: any) {
  return requestClient.post('/sys/post/detail', data);
}
