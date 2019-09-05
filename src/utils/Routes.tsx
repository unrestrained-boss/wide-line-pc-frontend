import React, {lazy} from "react";
import MenuService from "../services/MenuService";
import {Button, Result} from "antd";
import UserService from "../services/UserService";
import uniqueId from "lodash/uniqueId";

const loadComponent = (path: string) => lazy(() => import(`../pages/${path}`));

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
      extra={<Button onClick={() => {
        window.location.href = process.env.REACT_APP_BASE_URL as string;
      }}
                     type="primary">返回主页</Button>}
    />
  );
}

const localRoutes: { [s: number]: IRoute } = {
  100: {
    path: '/banner',
    component: loadComponent('banner/BannerPage'),
  },
  101: {
    path: '/banner-item',
    component: loadComponent('banner-item/BannerItemPage'),
  },
  102: {
    path: '/administration',
    component: loadComponent('administration/AdministrationPage'),
  },
  103: {
    path: '/role',
    component: loadComponent('role/RolePage'),
  },
  104: {
    path: '/menu',
    component: loadComponent('menu/MenuPage'),
  },
  200: {
    path: '/product',
    component: loadComponent('product/ProductPage'),
  },
  201: {
    path: '/product-classification',
    component: loadComponent('product-classification/ProductClassificationPage'),
  },
  202: {
    path: '/product-brand',
    component: loadComponent('product-brand/ProductBrandPage'),
  },
  300: {
    path: '/order',
    component: loadComponent('order/OrderPage'),
  }
};

function getMenuAndRoutes(dynamicRoutes: IDynamicRoute[]): [IMenu[], IRoute[]] {
  const newRoutes: IRoute[] = dynamicRoutes.map(dynamicRoute => {
    const localRoute = localRoutes[dynamicRoute.id];
    // 未与本地映射
    if (!localRoute) {
      return {
        id: dynamicRoute.id,
        name: dynamicRoute.name,
        icon: dynamicRoute.icon,
        path: uniqueId('/~notfound_'),
        component: NotFoundComponent,
        sort: dynamicRoute.sort,
        pid: dynamicRoute.pid,
      }
    }
    return {
      id: dynamicRoute.id,
      name: dynamicRoute.name,
      icon: dynamicRoute.icon,
      path: localRoute.path,
      component: localRoute.component,
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

export let menus: IMenu[] = [];
export let routes: IRoute[] = [];

export async function init() {
  if (!UserService.getUserToken()) {
    return;
  }
  const data = await MenuService.getAvailableMenus();
  const [a, b] = getMenuAndRoutes(data as any);
  menus = a;
  routes = b;
  console.log(menus);
}
