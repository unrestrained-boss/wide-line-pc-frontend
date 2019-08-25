import BaseService from "../BaseService";

const useRoleList = () => BaseService.useServiceListBase<IRole>('/roles/index');

const addRole = BaseService.addServiceBase<IRole>('/roles/add');

const updateRole = BaseService.updateServiceBase<IRole>('/roles/edit');

const deleteRole = BaseService.deleteServiceBase('/roles/delete');

const toggleRoleStatus = BaseService.updateServiceBase<{status: boolean}>('/roles/edit');

const RoleService = {
  useRoleList,
  addRole,
  updateRole,
  deleteRole,
  toggleRoleStatus,
};
export default RoleService;

export interface IRole {
  id: number;
  name: string;
  desc: string;
  status: number;
}
