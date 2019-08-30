import {NewBaseService} from "./BaseService";

class BannerItemService extends NewBaseService<IBannerItem> {
  constructor() {
    super();
    this.path = '/banner-item';
  }
}

export default new BannerItemService();

export interface IBannerItem {
  id?: number;
  img: string | null;
  type: string;
  value: string;
  status: number;
  pid: number;
}
