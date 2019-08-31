import React from 'react';
import MenuService, {IMenu} from "../../services/MenuService";
import {ColumnProps} from "antd/lib/table";
import MenuAddModal from "./MenuAddModal";
import PageHoc from "../../utils/PageHoc";
import {Tag} from "antd";

interface IProps {

}

const MenuPage: React.FC<IProps> = (props) => {
  const columns: ColumnProps<IMenu>[] = [
    {title: '名称', dataIndex: 'name', width: 500, align: 'left',},
    {title: '图标', dataIndex: 'icon', width: 200, align: 'left',},
    {title: '链接', dataIndex: 'url', width: 200, align: 'left',},
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
  return PageHoc.TablePage<IMenu>(
    columns,
    MenuAddModal,
    MenuService,
    '菜单',
    {
      pagination: false
    }
  );
};

export default MenuPage;
