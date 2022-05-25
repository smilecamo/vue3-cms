import hyRequest from '../index';
import { IDataType } from '../types';
export function getPageData(url: string, data: any) {
  // 类型定义
  return hyRequest.post<IDataType>({
    url,
    data,
  });
}
export function createPageData(url: string, data: any) {
  // 类型定义
  return hyRequest.post<IDataType>({
    url,
    data,
  });
}
export function editPageData(url: string, data: any) {
  // 类型定义
  return hyRequest.patch<IDataType>({
    url,
    data,
  });
}
