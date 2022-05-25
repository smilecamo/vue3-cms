import { RouteRecordRaw } from 'vue-router';
import { IBreadCrumbType } from '@/base-ui/breadcrumb/types';

let firstMenu: any;
export default function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];
  // 1.先加载所有的默认routes
  const allRoutes: RouteRecordRaw[] = [];
  // require.context webpack遍历文件夹 true 递归遍历 匹配文件
  const routeFiles = require.context('../router/main', true, /\.ts/);
  //  routeFiles.keys() 根据目录下的keys
  // require('../router/main' + key.split('.')[1]); 导入文件
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1]);
    allRoutes.push(route.default);
  });
  // 2.根据用户的menus动态加载routes
  // 递归判断 是否要加入到路由里面
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((item) => item.path === menu.url);
        if (route) routes.push(route);
        // 保留第一个菜单项，供路由首页从定向
        if (!firstMenu) firstMenu = menu;
      } else {
        _recurseGetRoute(menu.children);
      }
    }
  };
  _recurseGetRoute(userMenus);
  return routes;
}
//
export function pathToBreadCrumb(menus: any, path: string): any {
  const breadCrumb: IBreadCrumbType[] = [];
  pathToMenu(menus, path, breadCrumb);
  return breadCrumb;
}
// 获取权限按钮
export function pathToPermission(menus: any): any {
  const allPermission: string[] = [];
  const _recurseGetPermission = (menuList: any) => {
    for (const permission of menuList) {
      if (permission.type === 1 || permission.type === 2) {
        // permission.children 有可能不存在
        _recurseGetPermission(permission.children ?? []);
      } else if (permission.type === 3) {
        allPermission.push(permission.permission);
      }
    }
  };
  _recurseGetPermission(menus);
  return allPermission;
}
export function pathToMenu(
  menus: any,
  path: string,
  breadCrumb?: IBreadCrumbType[],
): any {
  for (const menu of menus) {
    if (menu.type === 1) {
      const findMenu = pathToMenu(menu.children ?? [], path);
      if (findMenu) {
        breadCrumb?.push({ name: menu.name, path: menu.url });
        breadCrumb?.push({ name: findMenu.name, path: findMenu.url });
        return findMenu;
      }
    } else if (menu.type === 2 && menu.url === path) {
      return menu;
    }
  }
}
export function menuTreeToId(menuTree: any[]): any {
  const menuId: any[] = [];
  const _recurseGetId = (menuTree: any) => {
    for (const menu of menuTree) {
      if (menu.children) {
        _recurseGetId(menu.children);
      } else {
        menuId.push(menu.id);
      }
    }
  };
  _recurseGetId(menuTree);
  return menuId;
}
export { firstMenu };
