import BaseService from "../BaseService";
import Http from '../../utils/Http';
type TList = (page: number, pageSize?: number) => Promise<{
  total: number;
  data: IAdministration[];
}>;
const getAdministrationList: TList = (page: number, pageSize: number = 20) => {
  return Http.get('/user/index');
  // console.log('getAdministrationList', page, pageSize);
  // return new Promise((resolve) => {
  //   const result: IAdministration[] = new Array(pageSize).fill(1).map((item, index) => {
  //     const i = ((page - 1) * pageSize) + index + 1;
  //     return {
  //       id: i,
  //       username: 'username=' + i,
  //       remarks: '备注信息' + i,
  //       name: '管理员-' + i,
  //       phone: '123323' + i,
  //       permits: ['查看人员', '呵呵哈哈'],
  //     };
  //   });
  //   setTimeout(() => {
  //     resolve({
  //       total: 381,
  //       data: result
  //     });
  //   }, 100);
  // });
};

const useAdministrationList =() => BaseService.useServiceBaseList<IAdministration>(getAdministrationList);


export interface IAdministration {
  id?: number;
  username: string;
  remarks: string;
  name: string;
  phone: string;
  permits: string[];

}
const AdministrationService = {
  getAdministrationList,
  useAdministrationList,
};
export default AdministrationService;
