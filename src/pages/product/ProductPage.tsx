import React from "react";
import "./ProductPage.scss";
import { Tag} from "antd";
import {ColumnProps} from "antd/lib/table";
import PageHoc from "../../utils/PageHoc";
import ProductService, {IProduct} from "../../services/ProductService";
import ProductAddModal from "./ProductAddModal";

interface IProps {

}
const StatusColorAndText = [
  {text: '下架', color: 'red'},
  {text: '上架', color: 'blue'},
  {text: '后台下架', color: 'orange'},
  {text: '草稿', color: 'green'},
];

function getStatusTag(status: number) {
  const statusItem = StatusColorAndText[status];
  if (!statusItem) {
    return (<span>未知</span>);
  }
  return (
    <Tag color={statusItem.color}>
      {statusItem.text}
    </Tag>
  );
}
const ProductPage: React.FC<IProps> = (props: IProps) => {
  const columns: ColumnProps<IProduct>[] = [
    {title: '产品名称', dataIndex: 'name', width: 200, align: 'left',},
    {title: '产品编号', dataIndex: 'goods_num', width: 100, align: 'left',},
    {title: '最低价格', dataIndex: 'min_price', width: 100, align: 'left',},
    {title: '上架时间', dataIndex: 'sale_at', width: 180, align: 'left',},
    {
      title: '状态', dataIndex: 'status', render: (text) => {
        return (
          getStatusTag(text)
        );
      }
    },
  ];
  return PageHoc.TablePage<IProduct>(
    columns,
    ProductAddModal,
    ProductService,
    '产品',
    {
      pagination: true
    }
  );
};

export default ProductPage;
