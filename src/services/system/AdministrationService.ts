type TList = (page: number, pageSize?: number) => Promise<{
  total: number;
  data: IAdministration[];
}>;
const getAdministrationList: TList = (page: number, pageSize: number = 20) => {
  console.log('getAdministrationList', page, pageSize);
  return new Promise((resolve) => {
    const result: IAdministration[] = new Array(pageSize).fill(1).map((item, index) => {
      const i = ((page - 1) * pageSize) + index + 1;
      return {
        id: i,
        username: 'username=' + i,
        remarks: '备注信息' + i,
        name: '管理员-' + i,
        phone: '123323' + i,
        permits: ['查看人员', '呵呵哈哈'],
      };
    });
    setTimeout(() => {
      resolve({
        total: 381,
        data: result
      });
    }, 1000);
  });
};


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
};
export default AdministrationService;
