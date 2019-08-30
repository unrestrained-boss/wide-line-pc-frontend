import BaseService from "./BaseService";

const useAllProductBrandList = () => BaseService.useServiceListWithoutPagingBase<IProductBrand>('/brand/all');

const useProductBrandList = () => BaseService.useServiceListBase<IProductBrand>('/brand/index');

const addProductBrand = BaseService.addServiceBase<IProductBrand>('/brand/add');

const updateProductBrand = BaseService.updateServiceBase<IProductBrand>('/brand/edit');

const deleteProductBrand = BaseService.deleteServiceBase('/brand/delete');

const ProductBrandService = {
  useAllProductBrandList,
  useProductBrandList,
  addProductBrand,
  updateProductBrand,
  deleteProductBrand,
};

export default ProductBrandService;

export interface IProductBrand {
  id?: number;
  name: string;
  status: number;
}
