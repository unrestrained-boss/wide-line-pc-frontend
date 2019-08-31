import BaseService, {NewBaseService} from "./BaseService";

class MenuService extends NewBaseService<IMenu> {
  constructor() {
    super();
    this.path = '/menus';
  }
  useList() {
    const path = this.path;
    return BaseService.useListBase<IMenu>(path + '/index');
  }

  useMenuList() {
    return BaseService.useListBase<{
      uri: string;
      method: string;
    }>('/menus/urls');
  }
  getAvailableMenus() {
    return new Promise((resolve) => {
      setTimeout(() => {

        resolve([
          {id: 1, name: '系统设置', icon: 'icon-1', sort: 1, pid: 0},
          {id: 2, name: '用户管理', icon: 'icon-2', sort: 3, pid: 0},
          {id: 3, name: '订单管理', icon: '', sort: 2, pid: 0},
          {id: 4, name: '产品管理', icon: '', sort: 4, pid: 0},
          {id: 100, name: 'banner分类管理', icon: '', sort: 4, pid: 1,},
          {id: 101, name: 'banner管理', icon: '', sort: 2, pid: 1,},
          {id: 102, name: '管理员管理', icon: '', sort: 3, pid: 1,},
          {id: 103, name: '角色管理', icon: '', sort: 1, pid: 1,},
          {id: 104, name: '菜单管理', icon: '', sort: 5, pid: 1,},
          {id: 200, name: '产品管理', icon: '', sort: 5, pid: 4,},
          {id: 201, name: 'SKU管理', icon: '', sort: 5, pid: 4,},
          {id: 202, name: '分类管理', icon: '', sort: 5, pid: 4,},
          {id: 203, name: '品牌管理', icon: '', sort: 5, pid: 4,},
          {id: 300, name: '订单管理', icon: '', sort: 5, pid: 3,},
        ])
      }, 500);
    });
  };
}

export default new MenuService();

export interface IMenu {
  id?: number;
  name: string;
  as?: string;
  pid?: number;
  url: string;
  icon: string;
  status: number;
  sort: number;
}
