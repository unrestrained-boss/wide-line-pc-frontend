import BaseService from "./BaseService";

const useAllBannerList = () => BaseService.useServiceListWithoutPagingBase<IBanner>('/banner/all');

const useBannerList = () => BaseService.useServiceListBase<IBanner>('/banner/index');

const addBanner = BaseService.addServiceBase<IBanner>('/banner/add');

const updateBanner = BaseService.updateServiceBase<IBanner>('/banner/edit');

const deleteBanner = BaseService.deleteServiceBase('/banner/delete');

const toggleBannerStatus = BaseService.updateServiceBase<{ status: boolean }>('/banner/edit');

const BannerService = {
  useAllBannerList,
  useBannerList,
  addBanner,
  updateBanner,
  deleteBanner,
  toggleBannerStatus,
};

export default BannerService;

export interface IBanner {
  id?: number;
  name: string;
  status: number;
}
