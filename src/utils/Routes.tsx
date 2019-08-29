import React, {lazy} from "react";
import MenuService from "../services/system/MenuService";
import {Button, Result} from "antd";

const loadComponentWithModulesPrefix = (path: string) => lazy(() => import(`../modules/${path}`));

interface IDynamicRoute {
  id: number;
  name: string;
  icon: string;
  sort: number;
  pid: number;
}

export interface IRoute {
  id?: number,
  name?: string;
  icon?: string;
  path: string;
  component?: any;
  sort?: number;
  pid?: number;
}

export interface IMenu {
  name: string;
  icon: string;
  path: string;
  sort: number;
  children?: IMenu[];
}

function NotFoundComponent() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉, 你访问的页面不存在!"
      extra={<Button type="primary">返回主页</Button>}
    />
  );
}

const localRoutes: { [s: number]: IRoute } = {
  1: {path: '/system',},
  2: {path: '/user',},
  3: {path: '/order',},
  4: {path: '/product',},
  100: {
    path: '/system/banner',
    component: loadComponentWithModulesPrefix('system/banner/BannerPage'),
  },
  101: {
    path: '/system/banner-item',
    component: loadComponentWithModulesPrefix('system/banner-item/BannerItemPage'),
  },
  102: {
    path: '/system/administration',
    component: loadComponentWithModulesPrefix('system/administration/AdministrationPage'),
  },
  103: {
    path: '/system/role',
    component: loadComponentWithModulesPrefix('system/role/RolePage'),
  },
  104: {
    path: '/system/menu',
    component: loadComponentWithModulesPrefix('system/menu/MenuPage'),
  }
};

function getMenuAndRoutes(dynamicRoutes: IDynamicRoute[]): [IMenu[], IRoute[]] {
  const newRoutes: IRoute[] = dynamicRoutes.map(dynamicRoute => {
    const localRoute = localRoutes[dynamicRoute.id];
    return {
      id: dynamicRoute.id,
      name: dynamicRoute.name,
      icon: dynamicRoute.icon,
      path: localRoute.path,
      component: localRoute.component || NotFoundComponent,
      sort: dynamicRoute.sort,
      pid: dynamicRoute.pid,
    };
  });

  return [dd(newRoutes, 0), newRoutes];
}

function dd(routes: IRoute[], pid: number): IMenu[] {
  const results: IMenu[] = [];
  for (let route of routes) {
    if (route.pid === pid) {
      const item: IMenu = {
        name: route.name!,
        icon: route.icon!,
        path: route.path,
        sort: route.sort!,
      };
      item.children = dd(routes, route.id!);
      if (item.children.length === 0) {
        delete item.children;
      } else {
        item.children = item.children.sort((a, b) => a.sort! - b.sort!);
      }
      results.push(item);
    }
  }
  return results.sort((a, b) => a.sort! - b.sort!);
}
export let menus: IMenu[];
export let routes: IRoute[];
export async function init() {
  const data = await MenuService.getAvailableMenus();
  const [a, b] = getMenuAndRoutes(data as any);
  menus = a;
  routes = b;
}
