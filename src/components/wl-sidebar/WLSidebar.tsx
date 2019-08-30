import React, {useEffect, useState} from 'react';
import {IMenu} from "../../pages/dashboard/DashBoardPage";
import {dashBoardPath, history} from "../../utils/Constant";
import {Icon, Menu} from 'antd';

interface IProps {
  menus?: IMenu[];
  collapsed: boolean;
}

const dashBoardPathReg = new RegExp(`^${dashBoardPath}`);
const defaultSelectedKey = history.location.pathname.replace(dashBoardPathReg, '');
const WLSidebar: React.FC<IProps> = (props) => {
  const {menus = [], collapsed = false} = props;
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  useEffect(() => {
    // 刷新时自动展开 subMenu
    const el = document.querySelector<HTMLLIElement>('.ant-menu-submenu-selected');
    if (el) {
      setOpenKeys([el.dataset.key as string]);
      // menuItem 自动进入视野
      setTimeout(() => {
        const el = document.querySelector<HTMLLIElement>('.ant-menu-item-selected');
        el && el.scrollIntoView();
      }, 0);
    }
  }, []);
  // https://codepen.io/aforme/pen/wVyYzm
  const customProps = collapsed ? undefined : {
    openKeys,
    onOpenChange: (openKeys: string[]) => setOpenKeys(openKeys),
  };
  return (
    <Menu theme={"dark"}
          mode={"inline"}
          {...customProps}
          defaultSelectedKeys={[defaultSelectedKey]}
          forceSubMenuRender
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
      <Menu.SubMenu data-key={menu.path} key={menu.path} title={<span>
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
