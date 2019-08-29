import React, {lazy, Suspense, useState} from 'react';
import {Layout, Icon, Button} from 'antd';
import WLSidebar from "../components/wl-sidebar/WLSidebar";
import {Route, Switch} from "react-router";
import {dashBoardPath} from "../utils/Constant";
import NotFound from "./NotFound";
import './DashBoardPage.scss';

interface Props {

}

const loadComponentWithModulesPrefix = (path: string) => lazy(() => import(`../modules/${path}`));

const menus: IMenu[] = [
  {
    name: '系统管理',
    path: '/system',
    icon: '',
    children: [
      {name: 'banner分类管理', path: '/system'},
      {name: 'banner管理', path: '/system/banner-item'},
      {name: '管理员管理', path: '/system/administration'},
      {name: '角色管理', path: '/system/role'},
      {name: '菜单管理', path: '/system/menu'},
      {name: '日志管理', path: '/system/log'}]
  },
  {
    name: '用户管理', path: '/user', icon: '', children: [{
      name: '用户管理', path: '/user',
      children: [
        {name: '用户管理1', path: '/user1'},
        {name: '用户管理2', path: '/user2'},
      ]
    }]
  },
  {
    name: '订单管理',
    path: '/order',
    icon: '',
    children: [{name: '订单管理', path: '/order'}, {name: '奖励管理', path: '/order/reward'}]
  },
  {
    name: '产品管理',
    path: '/product',
    icon: '',
    children: [{name: '产品管理', path: '/product'}, {name: '分类管理', path: '/product/classification'}]
  },
];
const routes = [
  {
    path: 'system',
    component: loadComponentWithModulesPrefix('system/banner/BannerPage'),
  },
  {
    path: 'system/banner-item',
    component: loadComponentWithModulesPrefix('system/banner-item/BannerItemPage'),
  },
  {
    path: 'system/administration',
    component: loadComponentWithModulesPrefix('system/administration/AdministrationPage'),
  },
  {
    path: 'system/role',
    component: loadComponentWithModulesPrefix('system/role/RolePage'),
  },
  {
    path: 'system/menu',
    component: loadComponentWithModulesPrefix('system/menu/MenuPage'),
  }
];

const DashBoardPage: React.FC<Props> = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{height: '100%'}}>
      <Layout.Sider trigger={null} collapsed={collapsed}>
        <div style={{textAlign: 'center', color: '#fff', height: '64px', lineHeight: '64px'}}>后台管理</div>
        <WLSidebar menus={menus}/>
      </Layout.Sider>
      <Layout>
        <Layout.Header>
          <Button onClick={() => {
            setCollapsed(!collapsed);
          }}>
            <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
            />
          </Button>
        </Layout.Header>
        <Layout.Content className={"router-outlet"}>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              {routes.map(route => {
                return (
                  <Route key={route.path} exact
                         path={`${dashBoardPath}/${route.path}`}
                         component={route.component}/>
                );
              })}
              <Route component={NotFound}/>
            </Switch>
          </Suspense>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
export default DashBoardPage;

export interface IMenu {
  name: string;
  icon?: string;
  path?: string;
  children?: IMenu[];
}
