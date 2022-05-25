import { createStore, useStore as useVuxStore, Store } from 'vuex';
import loginModule from './login/login';
import systemModule from './main/system/system';
import dashboardModule from './main/analysis/dashboard';
import { getPageData } from '@/service/system/system';
import { IStoreType } from './types';
const store = createStore({
  state: { entireRole: [], entireDepartment: [], entireMenu: [] },

  mutations: {
    changeRole(state, data) {
      state.entireRole = data;
    },
    changeDepartment(state, data) {
      state.entireDepartment = data;
    },
    changeMenu(state, data) {
      state.entireMenu = data;
    },
  },
  actions: {
    async initData({ commit }) {
      const RoleResult = await getPageData('/role/list', {
        offset: 0,
        size: 1000,
      });
      const { list: roleList } = RoleResult.data ?? {};
      commit('changeRole', roleList);
      const departmentResult = await getPageData('/department/list', {
        offset: 0,
        size: 1000,
      });
      const { list: departmentList } = departmentResult.data;
      commit('changeDepartment', departmentList);
      const menuResult = await getPageData('/menu/list', {
        offset: 0,
        size: 1000,
      });
      const { list: menuList } = menuResult.data;
      commit('changeMenu', menuList);
    },
  },
  modules: { loginModule, systemModule, dashboardModule },
});
// 初始化store
export function setupStore() {
  store.dispatch('loginModule/localStore');
  store.dispatch('initData');
}

export function useStore(): Store<IStoreType> {
  return useVuxStore();
}
export default store;
