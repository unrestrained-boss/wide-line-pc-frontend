import React from 'react';
import MenuService, {IMenu} from "../../services/MenuService";
import {ColumnProps} from "antd/lib/table";
import MenuAddModal from "./MenuAddModal";
import PageHoc from "../../utils/PageHoc";

interface IProps {

}

const MenuPage: React.FC<IProps> = (props) => {
  const columns: ColumnProps<IMenu>[] = [
    {title: '名称', dataIndex: 'name', width: 500, align: 'left',},
    {title: '图标', dataIndex: 'icon', width: 200, align: 'left',},
    {title: '链接', dataIndex: 'url', width: 200, align: 'left',},
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
