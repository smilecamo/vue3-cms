import type { AxiosRequestConfig, AxiosResponse } from 'axios';

// 拦截器的接口定义，可以根据不同的实例 传入不同的拦截器

export interface HYRequestInterceptors<T = AxiosResponse> {
  // 请求拦截 正常拦截
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  // 请求拦截 报错拦截
  requestInterceptorCatch?: (error: any) => any;
  // 响应拦截 正常拦截
  responseInterceptor?: (res: T) => T;
  // 响应拦截 报错拦截
  responseInterceptorCatch?: (error: any) => any;
}
// 接口继承 扩展 AxiosRequestConfig 增加拦截器
export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYRequestInterceptors<T>;
  showLoading?: boolean;
}
