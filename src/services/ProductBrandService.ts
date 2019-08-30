import {NewBaseService} from "./BaseService";

class ProductBrandService extends NewBaseService<IProductBrand> {
  constructor() {
    super();
    this.path = '/user';
  }
}

export default new ProductBrandService();

export interface IProductBrand {
  id?: number;
  name: string;
  status: number;
}
