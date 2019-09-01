import React from "react";
import "./ProductBrandPage.scss";
import {Tag} from "antd";
import {ColumnProps} from "antd/lib/table";
import PageHoc from "../../utils/PageHoc";
import ProductBrandService, {IProductBrand} from "../../services/ProductBrandService";
import ProductBrandAddModal from "./ProductBrandAddModal";

interface IProps {

}

const ProductBrandPage: React.FC<IProps> = (props: IProps) => {
  const columns: ColumnProps<IProductBrand>[] = [
    {title: '名称', dataIndex: 'name', width: 500, align: 'left',},
    {
      title: 'is_bottom', dataIndex: 'is_bottom', align: 'left', render: (text) => {
        return (
          <Tag color={text === 1 ? 'blue' : 'red'}>
            {text === 1 ? '是' : '否'}
          </Tag>
        );
      }
    },
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
  return PageHoc.TablePage<IProductBrand>(
    columns,
    ProductBrandAddModal,
    ProductBrandService,
    '品牌',
    {
      pagination: false
    }
  );
};

export default ProductBrandPage;
