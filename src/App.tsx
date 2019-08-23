import React from 'react';
import {Redirect, Route, Router, Switch} from "react-router";
import {dashBoardPath, history} from './utils/Constant';
import {DashBoardPage} from "./pages/DashBoardPage";
import {LoginPage} from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  // console.log(process.env);
  return (
    <Router history={history}>
      <Switch>
        <Route path={dashBoardPath} component={DashBoardPage}/>
        <Redirect exact path="/" to={dashBoardPath}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route component={NotFound}/>
      </Switch>
    </Router>
  );
};

export default App;
