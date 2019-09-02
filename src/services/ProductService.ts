import BaseService, {NewBaseService} from "./BaseService";

class ProductService extends NewBaseService<IProduct> {
  constructor() {
    super();
    this.path = '/product';
  }
  useList() {
    const path = this.path;
    return BaseService.useListBase<IProduct>(path + '/index');
  }
}

export default new ProductService();

export interface IProduct {
  id?: number;
  user_id: number; // 用户 Id
  name: string; // 产品名称
  goods_num: string; // 货号
  min_price: number; // 最低价格
  thumbs: string[]; // 轮播
  details: string; // 详情 富文本
  status: number; // 状态 1 上架 0 用户下架 2 后台下架
  pid: number;
}
