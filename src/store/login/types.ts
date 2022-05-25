interface ILoginState {
  token: string;
  userInfo: any;
  userMenus: any;
  allMenus?: any;
  permission?: string[];
}
export default ILoginState;
