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
  user_id?: number; // 用户 Id
  name: string; // 产品名称
  goods_num: string; // 货号
  min_price?: number; // 最低价格
  cid_info: string[], // 分类 id 包括父节点
  bid_info: string[], // 品牌 id 包括父节点
  thumbs: string[] | string; // 轮播
  sku: any[] | string; // 轮播
  details: string; // 详情 富文本
  status: number; // 状态 0 下架 1 上架  2 后台下架 3 草稿
}
