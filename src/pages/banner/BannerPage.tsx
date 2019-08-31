import React from 'react';
import BannerService, {IBanner} from "../../services/BannerService";
import { Tag} from "antd";
import {ColumnProps} from "antd/lib/table";
import PageHoc from "../../utils/PageHoc";
import BannerAddModal from "./BannerAddModal";

interface IProps {

}

const BannerPage: React.FC<IProps> = (props) => {
  const columns: ColumnProps<IBanner>[] = [
    {title: '名称', dataIndex: 'name', width: 200, align: 'left',},
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
  return PageHoc.TablePage<IBanner>(
    columns,
    BannerAddModal,
    BannerService,
    'banner分类'
  );
};

export default BannerPage;
