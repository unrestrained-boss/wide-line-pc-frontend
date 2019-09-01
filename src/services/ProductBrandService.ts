import BaseService, {NewBaseService} from "./BaseService";

class ProductBrandService extends NewBaseService<IProductBrand> {
  constructor() {
    super();
    this.path = '/product-brand';
  }
  useList() {
    const path = this.path;
    return BaseService.useListBase<IProductBrand>(path + '/index');
  }
}

export default new ProductBrandService();

export interface IProductBrand {
  id?: number;
  name: string;
  status: number;
  is_bottom: number;
  pid: number;
}
