import BaseService from "../BaseService";

const useMenuList = () => BaseService.useServiceListWithoutPagingBase<IMenu>('/menus/index');

const useMenuUrlList = () => BaseService.useServiceListWithoutPagingBase<{
  uri: string;
  method: string;
}>('/menus/urls');

const addMenu = BaseService.addServiceBase<IMenu>('/menus/add');

const updateMenu = BaseService.updateServiceBase<IMenu>('/menus/edit');

const deleteMenu = BaseService.deleteServiceBase('/menus/delete');

const toggleMenuStatus = BaseService.updateServiceBase<{ status: boolean }>('/menus/edit');

const getAvailableMenus = () => {
  return new Promise((resolve) => {
    setTimeout(() => {

      resolve([
        {id: 1, name: '系统设置1', icon: 'icon-1', sort: 1, pid: 0},
        {id: 2, name: '用户管理', icon: 'icon-2', sort: 3, pid: 0},
        {id: 3, name: '订单管理', icon: '', sort: 2, pid: 0},
        {id: 4, name: '产品管理', icon: '', sort: 4, pid: 0},
        {id: 100, name: 'banner分类管理', icon: '', sort: 4, pid: 1,},
        {id: 101, name: 'banner管理', icon: '', sort: 2, pid: 1,},
        {id: 102, name: '管理员管理', icon: '', sort: 3, pid: 1,},
        {id: 103, name: '角色管理', icon: '', sort: 1, pid: 1,},
        {id: 104, name: '菜单管理', icon: '', sort: 5, pid: 1,}
      ])
    }, 500);
  });
};

const MenuService = {
  useMenuList,
  useMenuUrlList,
  addMenu,
  updateMenu,
  deleteMenu,
  toggleMenuStatus,
  getAvailableMenus,
};

export default MenuService;

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
