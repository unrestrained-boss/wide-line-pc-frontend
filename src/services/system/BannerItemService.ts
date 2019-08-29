import BaseService from "../BaseService";

const useBannerItemList = () => BaseService.useServiceListBase<IBannerItem>('/banner-item/index');

const addBannerItem = BaseService.addServiceBase<IBannerItem>('/banner-item/add');

const updateBannerItem = BaseService.updateServiceBase<IBannerItem>('/banner-item/edit');

const deleteBannerItem = BaseService.deleteServiceBase('/banner-item/delete');

const toggleBannerItemStatus = BaseService.updateServiceBase<{ status: boolean }>('/banner-item/edit');

const BannerItemService = {
  useBannerItemList,
  addBannerItem,
  updateBannerItem,
  deleteBannerItem,
  toggleBannerItemStatus,
};

export default BannerItemService;

export interface IBannerItem {
  id?: number;
  img: string | null;
  type: string;
  value: string;
  status: number;
  pid: number;
}
