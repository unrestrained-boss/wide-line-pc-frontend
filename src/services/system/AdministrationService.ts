import BaseService from "../BaseService";
import Http, {ResponseError} from '../../utils/Http';
import {AxiosResponse} from "axios";

type TList = (page: number, pageSize?: number) => Promise<[
  {
    total: number,
    data: IAdministration[],
  } | null,
  ResponseError | null,
  AxiosResponse
  ]>;
const getAdministrationList: TList = (page: number, pageSize: number = 20) => {
  return Http.get('/user/index');
};

const useAdministrationList = () => BaseService.useServiceBaseList<IAdministration>(getAdministrationList);

const addAdministration = (body: IAdministration & {password: string, repassword: string}) => {
  return Http.post('/user/add', body);
};

export interface IAdministration {
  id?: number;
  username: string;
  nickname: string;
  avatar?: string;
  mobile: string;
  status: number;
}

const AdministrationService = {
  getAdministrationList,
  useAdministrationList,
  addAdministration,
};
export default AdministrationService;
