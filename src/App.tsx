import React from 'react';
import {Redirect, Route, Router, Switch} from "react-router";
import {dashBoardPath, history} from './utils/Constant';
import DashBoardPage from "./pages/DashBoardPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import zhCN from 'antd/es/locale/zh_CN';
import {ConfigProvider} from "antd";

const App: React.FC = () => {
  // console.log(process.env);
  return (
    <ConfigProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
          <Route path={dashBoardPath} component={DashBoardPage}/>
          <Redirect exact path="/" to={dashBoardPath}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route component={NotFound}/>
        </Switch>
      </Router>
    </ConfigProvider>
  );
};

export default App;
