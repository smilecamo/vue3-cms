import { Module } from 'vuex';
import ILoginState from './types';
import IRootState from '../types';
import type { IAcountType } from '@/service/login/login';
import { accountLogin, getUserInfo, getUserMenu } from '@/service/login/login';
import localCache from '../../utils/cache';
import mapMenusToRoutes, { pathToPermission } from '../../utils/map-menus';
import router from '@/router';
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permission: [],
    };
  },
  mutations: {
    // 保存token
    changeToken(state, token: string) {
      state.token = token;
    },
    // 保存userInfo
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    // 保存userInfo
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus;
      // 映射路由
      const routes = mapMenusToRoutes(userMenus);
      routes.forEach((item) => {
        router.addRoute('main', item);
      });
      state.permission = pathToPermission(userMenus);
    },
  },
  actions: {
    // 账号登录
    async accountLoginAction({ commit, dispatch }, payload: IAcountType) {
      // 异步请求 登录逻辑
      const loginResult = await accountLogin(payload);
      const { token, id } = loginResult.data;
      commit('changeToken', token);
      localCache.setCache('token', token);
      // 发送初始化请求 获取完整的role列表
      dispatch('initData', null, { root: true }); // {root:true} 子模块调用根模块的actions
      // 获取用户信息
      const userInfoResult = await getUserInfo(id);
      const userInfo = userInfoResult.data;
      commit('changeUserInfo', userInfo);
      localCache.setCache('userInfo', userInfo);
      // 获取用户菜单
      const userMenus = await getUserMenu(userInfo.role.id);
      commit('changeUserMenus', userMenus.data);
      localCache.setCache('userMenus', userMenus.data);
      // 跳转
      router.push('/main');
    },
    phoneLoginAction({ commit }, payload: any) {
      console.log(payload);
    },
    // 防止用户刷新vuex数据丢失，每次刷新main.ts中初始化数据
    localStore({ commit, dispatch }) {
      const token = localCache.getCache('token');
      if (token) {
        commit('changeToken', token);
        // 发送初始化请求 获取完整的role列表
        dispatch('initData', null, { root: true }); // {root:true} 子模块调用根模块的actions
      }
      const userInfo = localCache.getCache('userInfo');
      if (userInfo) {
        commit('changeUserInfo', userInfo);
      }
      const userMenus = localCache.getCache('userMenus');
      if (userMenus) {
        commit('changeUserMenus', userMenus);
      }
    },
  },
};

export default loginModule;
