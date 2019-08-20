import React, {PureComponent} from 'react';
import ClrHeader from "../components/clr-header/ClrHeader";
import ClrSidebar from "../components/clr-sidebar/ClrSidebar";
import './DashBoardPage.scss'
import {Route, RouteComponentProps, Switch} from "react-router";
import AdministrationPage from "../modules/system/administration/AdministrationPage";
import BannerPage from "../modules/system/banner/BannerPage";
import NotFound from "./NotFound";
import {dashBoardPath, history} from "../utils/utils";

interface OwnProps extends RouteComponentProps {
}

type Props = OwnProps;

type State = Readonly<{
  currentIndex: number;
  menus: IMenu[]
}>;

export class DashBoardPage extends PureComponent<Props, State> {
  readonly state: State = {
    currentIndex: -1,
    menus: [
      {
        name: '系统管理',
        module: 'system',
        icon: '',
        children: [
          {name: 'banner管理', path: '/system'},
          {name: '管理员管理', path: '/system/administration'},
          {name: '角色管理', path: '/system/rule'},
          {name: '物流公司管理', path: '/system/logistics'}, {name: '日志管理', path: '/system/log'}]
      },
      {name: '用户管理', module: 'user', icon: '', children: [{name: '用户管理', path: '/user'}]},
      {
        name: '订单管理',
        module: 'order',
        icon: '',
        children: [{name: '订单管理', path: '/order'}, {name: '奖励管理', path: '/order/reward'}]
      },
      {
        name: '产品管理',
        module: 'product',
        icon: '',
        children: [{name: '产品管理', path: '/product'}, {name: '分类管理', path: '/product/classification'}]
      },
    ]
  };

  UNSAFE_componentWillMount(): void {
    history.listen(({pathname}) => this.handlePathChanged(pathname));
    this.handlePathChanged(history.location.pathname);
  }

  handlePathChanged(path: string) {
    const moduleName = path.split('/')[2];
    this.setState({currentIndex: this.state.menus.findIndex((item) => item.module === moduleName)});
  }

  get subMenus(): IMenu[] {
    if (this.state.currentIndex === -1) {
      return [];
    }
    return this.state.menus[this.state.currentIndex].children!;
  }

  handleMenuIndexChanged(index: number) {
    this.setState({currentIndex: index});
  }

  render() {
    return (
      <main className="dashboard-container">
        <ClrHeader currentIndex={this.state.currentIndex} onMenuChanged={index => this.handleMenuIndexChanged(index)}
                   menus={this.state.menus}/>
        <section className="content">
          <ClrSidebar menus={this.subMenus}/>
          <section className="router-outlet">
            <Switch>
              <Route exact path={`${dashBoardPath}/system`} component={BannerPage}/>
              <Route exact path={`${dashBoardPath}/system/administration`} component={AdministrationPage}/>
              <Route component={NotFound}/>
            </Switch>
          </section>
        </section>
      </main>
    );
  }
}

export interface IMenu {
  name: string;
  icon?: string;
  module?: string;
  path?: string;
  children?: IMenu[];
}
