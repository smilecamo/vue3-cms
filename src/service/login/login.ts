import hyRequest from '../index';

export interface IAcountType {
  name: string;
  password: string;
}
export interface ILoginResultType {
  name: string;
  id: number;
  token: string;
}
export interface IDataType<T = any> {
  code: number;
  data: T;
}

// api
enum accountUrl {
  LoginUrl = '/login',
  LoginUserInfo = '/users/', // users/1
  userMenu = '/role/', // role/1/menu
  allMenu = '/menu', //
}
// 登录
export function accountLogin(account: IAcountType) {
  // 类型定义
  return hyRequest.post<IDataType<ILoginResultType>>({
    url: accountUrl.LoginUrl,
    data: account,
  });
}

// 获取用户信息
export function getUserInfo(id: number) {
  // 类型定义
  return hyRequest.get<IDataType>({
    url: accountUrl.LoginUserInfo + id,
    showLoading: false,
  });
}
// 获取用户菜单
export function getUserMenu(id: number) {
  // 类型定义
  return hyRequest.get<IDataType>({
    url: accountUrl.userMenu + id + '/menu',
    showLoading: false,
  });
}
