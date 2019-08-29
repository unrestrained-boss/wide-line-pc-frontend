import React from 'react';
import {IMenu} from "../../pages/DashBoardPage";
import {dashBoardPath, history} from "../../utils/Constant";
import {Icon, Menu} from 'antd';

interface Props {
  menus?: IMenu[];
}

const dashBoardPathReg = new RegExp(`^${dashBoardPath}`);
const defaultSelectedKey = history.location.pathname.replace(dashBoardPathReg, '');
const WLSidebar: React.FC<Props> = (props) => {
  const {menus = []} = props;
  return (
    <Menu theme={"dark"}
          mode={"inline"}
          defaultSelectedKeys={[defaultSelectedKey]}
          onClick={({key}) => {
            handleMenuItemClick(key);
          }}>
      {menus.map(item => {
        return getWLSidebarItem(item);
      })}
    </Menu>

  );
};

function handleMenuItemClick(key: string) {
  history.push(dashBoardPath + key);
}

function getWLSidebarItem(menu: IMenu) {
  if (menu.children) {
    return (
      <Menu.SubMenu key={menu.path} title={<span>
                <Icon type="mail"/>
                <span>{menu.name}</span>
              </span>}>
        {menu.children.map(item => {
          return getWLSidebarItem(item);
        })}
      </Menu.SubMenu>
    );
  }
  return (
    <Menu.Item key={menu.path}>
      <Icon type="inbox"/>
      <span>{menu.name}</span>
    </Menu.Item>
  );
}

export default WLSidebar;
