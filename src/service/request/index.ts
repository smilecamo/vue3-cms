import axios from 'axios';
import type { AxiosInstance } from 'axios';
// 扩展的拦截器 接口定义
import type { HYRequestInterceptors, HYRequestConfig } from './type';
import { ElLoading } from 'element-plus';
const DEFAULT_LOADING = true;
class HYRequest {
  // 创建axios 实例，可以在外围创造多个axios
  instance: AxiosInstance; // 相当于axios
  interceptors?: HYRequestInterceptors; // 拦截器
  loading?: any;
  showLoading: boolean;
  constructor(config: HYRequestConfig) {
    // 创建axios 实例
    this.instance = axios.create(config);
    // 保存基本信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING; // 是否显示loading
    this.interceptors = config.interceptors;
    // ==========从config中取出的拦截器是对应实例的拦截器 start
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch,
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch,
    );
    //  =========从config中取出的拦截器是对应实例的拦截器 end
    // =========添加所有实例的拦截器 相当于全局的拦截器 start
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
          });
        }
        return config;
      },
      (err) => {
        return err;
      },
    );
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close();
        const data = res.data;
        if (+data.code === 0) {
          return data;
        } else {
          console.log('error');
        }
      },
      (err) => {
        this.loading?.close();
        if (err.response.status === 404) {
          console.log('404');
        }
        return err;
      },
    );
    // =========添加所有实例的拦截器 相当于全局的拦截器 end
  }
  // 定义方法
  request<T>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 判断是不是给当前类showLoading赋值，不显示loading
      if (config.showLoading === false) {
        this.showLoading = false;
      }
      // ===============定义方法请求的单独拦截器 start
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          resolve(res);
          // ===============定义方法请求的单独拦截器 start
        })
        .catch((err) => {
          reject(err);
        })
        .finally(() => {
          // 将loading改为默认值 不会影响下一个请求
          this.showLoading = DEFAULT_LOADING;
        });
    });
  }
  get<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' });
  }
  post<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' });
  }
  delete<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' });
  }
  patch<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' });
  }
}

export default HYRequest;
