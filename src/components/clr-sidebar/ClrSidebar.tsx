import React, {PureComponent} from 'react';
import './ClrSidebar.scss'
import {IMenu} from "../../pages/DashBoardPage";
import {NavLink} from "react-router-dom";
import {dashBoardPath} from "../../utils/utils";

interface OwnProps {
  menus: IMenu[];
}

type Props = OwnProps;

type State = Readonly<{}>;

class ClrSidebar extends PureComponent<Props, State> {
  readonly state: State = {};

  render() {
    return (
      <ul className="clr-sidebar">
        {this.props.menus.map((menu: IMenu) => {
          return (
            <li key={menu.name} className="sidebar-item">
              <NavLink exact activeClassName="active" to={dashBoardPath + (menu.path as string)}>{menu.name}</NavLink>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default ClrSidebar;
