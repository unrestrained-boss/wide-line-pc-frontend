import {NewBaseService} from "./BaseService";

class BannerService extends NewBaseService<IBanner> {
  constructor() {
    super();
    this.path = '/banner';
  }

  // useAllBannerList() {
  //   return BaseService.useServiceListWithoutPagingBase<IBanner>("/banner/all");
  // }
}

export default new BannerService();

export interface IBanner {
  id?: number;
  name: string;
  status: number;
}
