import React from 'react';
import './ClrSidebar.scss'
import {IMenu} from "../../pages/DashBoardPage";
import {NavLink} from "react-router-dom";
import {dashBoardPath} from "../../utils/Constant";

interface Props {
  menus?: IMenu[];
}

const ClrSidebar: React.FC<Props> = (props) => {
  const {menus = []} = props;
  return (
    <ul className="clr-sidebar">
      {menus.map((menu: IMenu) => {
        return (
          <li key={menu.name} className="sidebar-item">
            <NavLink exact activeClassName="active" to={dashBoardPath + (menu.path as string)}>{menu.name}</NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default ClrSidebar;
