import BaseService from "../BaseService";
import Http, {ResponseError} from '../../utils/Http';
import {AxiosResponse} from "axios";

type TList = (page: number, pageSize?: number) => Promise<[
  {
    total: number,
    data: IBanner[],
  } | null,
  ResponseError | null,
  AxiosResponse
  ]>;
const getBannerList: TList = (page: number, pageSize: number = 20) => {
  return Http.get('/banner/index', {
    params: {page}
  });
};

const toggleBannerStatus: (id: number, status: boolean) => Promise<void> = (id: number, status: boolean) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  })
};

const useBannerList = () => BaseService.useServiceBaseList<IBanner>(getBannerList);

export interface IBanner {
  id?: number;
  name: string,
  image: string | string[],
  link: string,
  enable: boolean,
  sort: number
}

const BannerService = {
  getBannerList,
  toggleBannerStatus,
  useBannerList,
};
export default BannerService;
