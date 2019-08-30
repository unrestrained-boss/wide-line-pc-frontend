import React from "react";
import "./ProductBrandPage.scss";
import {Tag} from "antd";
import BannerAddModal from "../banner/BannerAddModal";
import {ColumnProps} from "antd/lib/table";
import PageHoc from "../../utils/PageHoc";
import ProductBrandService, {IProductBrand} from "../../services/ProductBrandService";

interface IProps {

}

const ProductBrandPage: React.FC<IProps> = (props: IProps) => {
  const columns: ColumnProps<IProductBrand>[] = [
    {title: '名称', dataIndex: 'name', width: 200, align: 'left',},
    {title: '首字母', dataIndex: 'initials', width: 200, align: 'left',},
    {title: 'logo', dataIndex: 'logo', width: 200, align: 'left',},
    {title: '专区大图', dataIndex: 'lager', width: 200, align: 'left',},
    {title: '起源故事', dataIndex: 'story', width: 200, align: 'left',},
    {title: '品牌制造商', dataIndex: 'isTheManufacturer', width: 200, align: 'left',},
    {
      title: '状态', dataIndex: 'status', render: (text) => {
        return (
          <Tag color={text === 1 ? 'blue' : 'red'}>
            {text === 1 ? '启用' : '禁用'}
          </Tag>
        );
      }
    },
  ];
  return PageHoc.TableWithPaging<IProductBrand>(
    columns,
    BannerAddModal,
    ProductBrandService,
    '品牌'
  );
};

export default ProductBrandPage;
