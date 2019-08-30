import React from "react";
import "./ProductSkuPage.scss";
import PageHoc from "../../utils/PageHoc";
import {IAdministration} from "../../services/AdministrationService";
import AdministrationAddModal from "../administration/AdministrationAddModal";
import {ColumnProps} from "antd/lib/table";
import ProductSkuService from "../../services/ProductSkuService";

interface IProps {

}

const ProductSkuPage: React.FC<IProps> = (props: IProps) => {
  const columns: ColumnProps<IAdministration>[] = [
    {title: '账号', dataIndex: 'username', width: 160, align: 'left',},
    {
      title: '头像&昵称', dataIndex: 'nickname', width: 200, align: 'left', render: (_, row) => {
        return (
          <>
            <img src={row.avatar as string}
                 style={{height: '30px', width: '30px', verticalAlign: 'middle', borderRadius: '5px'}}
                 alt=""/>&nbsp;&nbsp;
            <span>{row.nickname}</span>
          </>
        );
      }
    },
    {title: '电话号码', dataIndex: 'mobile', width: 140},
    {title: '邮箱', dataIndex: 'email', width: 300},
  ];
  return PageHoc.TableWithPaging<IAdministration>(
    columns,
    AdministrationAddModal,
    ProductSkuService
  );
};

export default ProductSkuPage;
