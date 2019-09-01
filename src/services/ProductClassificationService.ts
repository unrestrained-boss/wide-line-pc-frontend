import BaseService, {NewBaseService} from "./BaseService";

class ProductClassificationService extends NewBaseService<IProductClassification> {
  constructor() {
    super();
    this.path = '/product-category';
  }
  useList() {
    const path = this.path;
    return BaseService.useListBase<IProductClassification>(path + '/index');
  }
}

export default new ProductClassificationService();

export interface IProductClassification {
  id?: number;
  name: string;
  specs_name: string;
  status: number;
  is_bottom: number;
  sort: number;
  pid: number;
}
