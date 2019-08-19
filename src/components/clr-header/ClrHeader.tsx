import React, {PureComponent} from 'react';
import './ClrHeader.scss'
import {IMenu} from "../../pages/DashBoardPage";

interface OwnProps {
  menus: IMenu[];
  currentIndex: number;
  onMenuChanged: (index: number) => void
}

type Props = OwnProps;

type State = Readonly<{}>;

class ClrHeader extends PureComponent<Props, State> {
  readonly state: State = {};

  render() {
    return (
      <header className="clr-header">
        <div className="branding">
          <img src="https://clarity.design/clarity-logo.3eb8bfa14838aba69688.svg" alt=""/>
          <div style={{width: '20px'}}/>
          <span>后台管理</span>
        </div>
        <ul className="navs">
          {this.props.menus.map((menu: IMenu, index: number) => {
            const {currentIndex, onMenuChanged} = this.props;
            const classNames = ['nav-item'];
            if (index === currentIndex) {
              classNames.push('active');
            }
            return (
              <li key={menu.name} onClick={() => {
                onMenuChanged(index);
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
              <li className="profile-item">退出登录</li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

export default ClrHeader;
