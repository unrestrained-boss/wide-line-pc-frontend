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

const MenuService = {
  useMenuList,
  useMenuUrlList,
  addMenu,
  updateMenu,
  deleteMenu,
  toggleMenuStatus,
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
