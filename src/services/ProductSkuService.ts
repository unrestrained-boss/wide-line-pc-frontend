import {NewBaseService} from "./BaseService";

class ProductSkuService extends NewBaseService<IProductSku> {
  constructor() {
    super();
    this.path = '/user';
  }
}

export default new ProductSkuService();

export interface IProductSku {
  id?: number;
}
