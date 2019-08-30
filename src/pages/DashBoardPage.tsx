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
      <Layout.Sider width={240} trigger={null}
                    collapsible
                    collapsed={collapsed}>
        <div className={"header"}>
          <img className="header-logo" src="http://cdn.admui.com/demo/iframe/2.1.0/images/logo-white-min.svg" alt=""/>
          <div style={{display: collapsed ? 'none' : 'inline'}} className="header-title">
            <span>国土战略防御局</span>
            <span className={"sub-title"}>S.H.I.E.L.D</span>
          </div>
        </div>
        <WLSidebar collapsed={collapsed} menus={menus}/>
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
