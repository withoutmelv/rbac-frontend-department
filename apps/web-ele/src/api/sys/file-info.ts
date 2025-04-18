import { requestClient } from '#/api/request';

/**
 * 文件上传
 * @param data
 */
export async function uploadFile(data: any) {
  return requestClient.upload('/sys/fileInfo/upload', data);
}
