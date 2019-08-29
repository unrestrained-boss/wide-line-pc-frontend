import React, {Suspense, useState} from 'react';
import {Layout, Icon, Button} from 'antd';
import WLSidebar from "../components/wl-sidebar/WLSidebar";
import {Route, Switch} from "react-router";
import {dashBoardPath} from "../utils/Constant";
import NotFound from "./NotFound";
import './DashBoardPage.scss';
import {menus, routes} from "../utils/Routes";

interface Props {

}

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
          <Suspense fallback={null}>
            <Switch>
              {routes.map(route => {
                return (
                  <Route key={route.path} exact
                         path={`${dashBoardPath}${route.path}`}
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
