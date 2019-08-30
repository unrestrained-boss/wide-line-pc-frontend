import React, {useEffect} from 'react';
import {Redirect, Route, Router, Switch} from "react-router";
import {dashBoardPath, history} from './utils/Constant';
import DashBoardPage from "./pages/dashboard/DashBoardPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import zhCN from 'antd/es/locale/zh_CN';
import {ConfigProvider} from "antd";
import UserService from "./services/UserService";

const App: React.FC = () => {
  useEffect(() => {
    if (!UserService.getUserToken()) {
      history.replace('/login');
    }
  }, []);
  return (
    <ConfigProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
          <Redirect exact path="/" to={dashBoardPath}/>
          <Route path={dashBoardPath} component={DashBoardPage}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route component={NotFound}/>
        </Switch>
      </Router>
    </ConfigProvider>
  );
};

export default App;
