import { requestClient } from '#/api/request';

/**
 * 分页查询字典列表
 * @param data
 */
export async function sysDictPage(data: any) {
  return requestClient.post<any>('/sys/dict/page', data);
}
/**
 * 添加字典
 * @param data 参数
 */
export async function sysDictSave(data: any) {
  return requestClient.post('/sys/dict/save', data);
}
/**
 * 修改字典
 * @param data 参数
 */
export async function sysDictUpdate(data: any) {
  return requestClient.post('/sys/dict/update', data);
}
/**
 * 删除字典
 * @param data 参数
 */
export async function sysDictRemove(data: any) {
  return requestClient.post('/sys/dict/remove', data);
}
/**
 * 字典详情
 * @param data 参数
 */
export async function sysDictDetail(data: any) {
  return requestClient.post('/sys/dict/detail', data);
}
/**
 * 枚举字典
 * @param data 参数
 */
export async function enumDictList(data: any) {
  return requestClient.post('/sys/dict/enumDictList', data);
}
/**
 * 自定义字典
 * @param data 参数
 */
export async function customDictList(data: any) {
  return requestClient.post('/sys/dict/customDictList', data);
}
