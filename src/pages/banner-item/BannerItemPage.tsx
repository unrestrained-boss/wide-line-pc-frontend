import React from 'react';
import { Tag} from "antd";
import {ColumnProps} from "antd/lib/table";
import BannerItemAddModal from "./BannerItemAddModal";
import BannerItemService, {IBannerItem} from "../../services/BannerItemService";
import PageHoc from "../../utils/PageHoc";

interface IProps {

}

const BannerItemPage: React.FC<IProps> = (props) => {
  const columns: ColumnProps<IBannerItem>[] = [
    {title: '类型', dataIndex: 'type', width: 200, align: 'left',},
    {
      title: 'banner', dataIndex: 'img', width: 240, align: 'center', render: (text) => {
        return (
          <img style={{height: '80px', width: '200px'}}
               src={text}
               alt=""/>
        );
      }
    },
    {title: '链接地址', dataIndex: 'value', width: 200, align: 'left',},
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
  return PageHoc.TablePage<IBannerItem>(
    columns,
    BannerItemAddModal,
    BannerItemService,
    'banner'
  );
};

export default BannerItemPage;
