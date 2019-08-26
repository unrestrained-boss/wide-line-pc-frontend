import React from "react";
import 'react-sortable-tree/style.css';
import ClrTreeTable from "../../../components/clr-table/ClrTreeTable";
import {ITableColumn} from "../../../components/clr-table/ClrTable";
import ClrButton from "../../../components/clr-button/ClrButton";
import MenuService from "../../../services/system/MenuService";
import ClrModalService from "../../../components/clr-modal/ClrModalService";
import MenuAddModal from "./MenuAddModal";

interface Props {

}

const MenuPage: React.FC<Props> = (props) => {
  const columns: ITableColumn[] = [
    { title: '名称', dataIndex: 'name', width: '160px', align: 'left', },
    { title: '状态', dataIndex: 'status', align: 'left', },
    { title: '图标', dataIndex: 'icon', align: 'left', },
    { title: '地址', dataIndex: 'url', align: 'left', },
    { title: '排序', dataIndex: 'sort', align: 'left', },
    {
      title: '操作',
      align: 'center',
      width: '160px',
      render: (row, index, data) => {
        return (
          <>
            <ClrButton size={"small"} type={"primary"}>编辑</ClrButton>
            &nbsp;&nbsp;
            <ClrButton size={"small"} type={"danger"}>删除</ClrButton>
          </>
        );
      }
    }
  ];

  const {data, refresh} = MenuService.useMenuList();
  
  function handleAddMenu() {
    ClrModalService.openModal(MenuAddModal, {
      title: '添加菜单',
      onComplete() {
        refresh();
      }
    })
  }
  return (
    <div className={"frame-content"}>
      <div style={{marginBottom: '20px'}}>
        <ClrButton onClick={handleAddMenu} type={"primary"}>+ 添加菜单</ClrButton>
      </div>
      <ClrTreeTable even columns={columns} data={data} rowKey={"id"}/>
    </div>
  );
};
export default MenuPage;
