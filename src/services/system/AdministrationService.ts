import BaseService from "../BaseService";

const useAdministrationList = () => BaseService.useServiceListBase<IAdministration>('/user/index');

const addAdministration = BaseService.addServiceBase<IAdministration & {password: string, repassword: string}>('/user/add');

const updateAdministration = BaseService.updateServiceBase<IAdministration>('/user/edit');

const deleteAdministration = BaseService.deleteServiceBase('/user/delete');

const toggleAdministrationStatus = BaseService.updateServiceBase<{status: boolean}>('/user/edit');

const AdministrationService = {
  useAdministrationList,
  addAdministration,
  updateAdministration,
  deleteAdministration,
  toggleAdministrationStatus,
};
export default AdministrationService;

export interface IAdministration {
  id?: number;
  username: string;
  nickname: string;
  avatar?: string | null;
  email: string;
  mobile: string;
  status: number;
}
