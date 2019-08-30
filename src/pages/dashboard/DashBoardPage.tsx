import React, {Suspense, useState} from 'react';
import {Layout, Icon, Avatar} from 'antd';
import WLSidebar from "../../components/wl-sidebar/WLSidebar";
import {Route, Switch} from "react-router";
import {dashBoardPath} from "../../utils/Constant";
import NotFound from "../NotFound";
import './DashBoardPage.scss';
import {menus, routes} from "../../utils/Routes";
import WLModal from "../../components/wl-modal/WLModal";
import UserService from "../../services/UserService";
import ChangePasswordModal from "./ChangePasswordModal";
import AccountInformationModal from "./AccountInformationModal";

interface Props {

}

const DashBoardPage: React.FC<Props> = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{height: '100%'}}>
      <Layout.Sider width={240} trigger={null}
                    collapsible
                    collapsed={collapsed}>
        <div className={"sider-header"}>
          <img className="sider-logo" src="http://cdn.admui.com/demo/iframe/2.1.0/images/logo-white-min.svg" alt=""/>
          <div style={{display: collapsed ? 'none' : 'inline'}} className="sider-title">
            <span>国土战略防御局</span>
            <span className={"sider-sub-title"}>S.H.I.E.L.D</span>
          </div>
        </div>
        <WLSidebar collapsed={collapsed} menus={menus}/>
      </Layout.Sider>
      <Layout>
        <Layout.Header className={"header"}>

          <Icon onClick={() => {
            setCollapsed(!collapsed);
          }}
                className={"header-trigger"}
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
          />
          <div className="header-expand"/>
          <div className="header-actions">
            <div className="profile-wrap">
              <Avatar style={{color: '#f56a00', backgroundColor: '#fde3cf'}}>
                面
              </Avatar>
              <span className="profile-username">面对疾风吧</span>
              <ul className="profile-popup-wrap">
                <li onClick={() => {
                  WLModal.openModal(AccountInformationModal, {
                    title: '账户信息'
                  });
                }}
                    className="profile-item">账户信息
                </li>
                <li onClick={() => {
                  WLModal.openModal(ChangePasswordModal, {
                    title: '修改密码',
                  });
                }}
                    className="profile-item">修改密码
                </li>
                <li onClick={() => {
                  WLModal.confirm('确认退出吗?', {
                    onOk: ({close}) => {
                      UserService.logoutUser();
                      window.location.href = process.env.REACT_APP_BASE_URL as string;
                      close();
                    }
                  });
                }}
                    className="profile-item">退出登录
                </li>
              </ul>
            </div>
          </div>
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
