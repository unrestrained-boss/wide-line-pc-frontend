import {NewBaseService} from "./BaseService";

class ProductSkuService extends NewBaseService<IAdministration> {
  constructor() {
    super();
    this.path = '/user';
  }
}

export default new ProductSkuService();

export interface IAdministration {
  id?: number;
  username: string;
  nickname: string;
  avatar?: string | null;
  email: string;
  mobile: string;
  status: number;
}
