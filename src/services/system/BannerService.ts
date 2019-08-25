import BaseService from "../BaseService";

const toggleBannerStatus: (id: number, status: boolean) => Promise<void> = (id: number, status: boolean) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  })
};

const useBannerList = () => BaseService.useServiceListBase<IBanner>('/banner/index');

export interface IBanner {
  id?: number;
  name: string,
  image: string | string[],
  link: string,
  enable: boolean,
  sort: number
}

const BannerService = {
  toggleBannerStatus,
  useBannerList,
};
export default BannerService;
