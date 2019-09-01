import React from "react";
import "./ProductClassificationPage.scss";
import {ColumnProps} from "antd/lib/table";
import {Tag} from "antd";
import PageHoc from "../../utils/PageHoc";
import ProductClassificationService, {IProductClassification} from "../../services/ProductClassificationService";
import ProductClassificationAddModal from "./ProductClassificationAddModal";

interface IProps {

}

const ProductClassificationPage: React.FC<IProps> = (props: IProps) => {
  const columns: ColumnProps<IProductClassification>[] = [
    {title: '名称', dataIndex: 'name', width: 200, align: 'left',},
    {title: 'specs_name', dataIndex: 'specs_name', width: 200, align: 'left',},
    {title: '排序', dataIndex: 'sort', width: 200, align: 'left',},
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
  return PageHoc.TablePage<IProductClassification>(
    columns,
    ProductClassificationAddModal,
    ProductClassificationService,
    '分类',
    {
      pagination: false
    }
  );
};

export default ProductClassificationPage;
