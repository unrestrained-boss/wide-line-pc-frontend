import React, {useEffect, useState} from 'react';
import './ClrHeader.scss'
import {IMenu} from "../../pages/DashBoardPage";
import isUndefined from 'lodash/isUndefined';
import UserService from "../../services/UserService";
import {history} from "../../utils/Constant";
import ClrModalService from "../clr-modal/ClrModalService";

interface Props {
  menus?: IMenu[];
  currentIndex?: number;
  onMenuChanged?: (index: number) => void
}


const ClrHeader: React.FC<Props> = (props) => {
  const [_menus, setMenus] = useState<IMenu[]>([]);
  const [_currentIndex, setCurrentIndex] = useState<number>(-1);
  useEffect(() => {
    setMenus(isUndefined(props.menus) ? [] : props.menus);
    setCurrentIndex(isUndefined(props.currentIndex) ? -1 : props.currentIndex);
  }, [props.menus, props.currentIndex]);

  return (
    <header className="clr-header">
      <div className="branding">
        <img src="https://clarity.design/clarity-logo.3eb8bfa14838aba69688.svg" alt=""/>
        <div style={{width: '20px'}}/>
        <span>后台管理</span>
      </div>
      <ul className="navs">
        {_menus.map((menu: IMenu, index: number) => {
          const {onMenuChanged} = props;
          const classNames = ['nav-item'];
          if (index === _currentIndex) {
            classNames.push('active');
          }
          return (
            <li key={menu.name} onClick={() => {
              setCurrentIndex(index);
              onMenuChanged && onMenuChanged(index);
            }} className={classNames.join(' ')}>
              {menu.name}
            </li>
          );
        })}
      </ul>
      <div className="actions">
        <div className="profile-wrap">
          <img src="https://avatars1.githubusercontent.com/u/19339440?s=460&v=4" alt="" className="profile-avatar"/>
          <span className="profile-username">面对疾风吧</span>
          <ul className="profile-popup-wrap">
            <li className="profile-item">账户信息</li>
            <li className="profile-item">修改密码</li>
            <li onClick={() => {
              ClrModalService.confirm('确认退出吗?', {
                onOk: ({ close }) => {
                  UserService.logoutUser();
                  history.replace('/login');
                  close();
                }
              });
            }} className="profile-item">退出登录</li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default ClrHeader;
