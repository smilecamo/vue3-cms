import { Module } from 'vuex';
import IRootState from '../../types';
import { ISystemType } from './types';
import {
  getPageData,
  createPageData,
  editPageData,
} from '@/service/system/system';
const systemModule: Module<ISystemType, IRootState> = {
  namespaced: true,
  state: {
    usersList: [],
    usersCount: 0,
    roleList: [],
    roleCount: 0,
    goodsList: [],
    goodsCount: 0,
    menuList: [],
    menuCount: 0,
  },
  mutations: {
    changeUsersList(state, userList) {
      state.usersList = userList;
    },
    changeUsersCount(state, userCount) {
      state.usersCount = userCount;
    },
    changeRoleList(state, list) {
      state.roleList = list;
    },
    changeRoleCount(state, count) {
      state.roleCount = count;
    },
    changeGoodsList(state, list) {
      state.goodsList = list;
    },
    changeGoodsCount(state, count) {
      state.goodsCount = count;
    },
    changeMenuList(state, list) {
      state.menuList = list;
    },
    changeMenuCount(state, count) {
      state.menuCount = count;
    },
  },
  getters: {
    getListData(state) {
      return (pageName: string) => {
        // 动态获取state
        return (state as any)[`${pageName}List`];
      };
    },
    getCount(state) {
      return (pageName: string) => {
        // 动态获取state
        return (state as any)[`${pageName}Count`];
      };
    },
  },
  actions: {
    // 获取页面数据
    async getPageListAction({ commit }, payload) {
      // 根据传递进来的pageName 设置url
      const pageName = payload.pageName;
      const url = `${pageName}/list`;
      const pageDataResult = await getPageData(url, payload.data);
      const { list, totalCount } = pageDataResult.data;
      // 根据传递进来的pageName 设置 mutations
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1);
      // 动态触发 commit
      commit(`change${changePageName}List`, list);
      commit(`change${changePageName}Count`, totalCount);
    },
    async createPageDataAction({ dispatch }, payload) {
      const { pageName, newData } = payload;
      const url = `/${pageName}`;
      await createPageData(url, newData);
      dispatch('getPageListAction', {
        pageName,
        data: { offset: 0, size: 10 },
      });
    },
    async editPageDataAction({ dispatch }, payload) {
      const { pageName, editData, id } = payload;
      const url = `/${pageName}/${id}`;
      await editPageData(url, editData);
      dispatch('getPageListAction', {
        pageName,
        data: { offset: 0, size: 10 },
      });
    },
  },
};
export default systemModule;
