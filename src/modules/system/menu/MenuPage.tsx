import React from "react";
import {ClrTreeTableWithSpinner} from "../../../components/clr-table/ClrTreeTable";
import {ITableColumn} from "../../../components/clr-table/ClrTable";
import ClrButton from "../../../components/clr-button/ClrButton";
import MenuService, {IMenu} from "../../../services/system/MenuService";
import ClrModalService from "../../../components/clr-modal/ClrModalService";
import MenuAddModal from "./MenuAddModal";
import ClrMessageService from "../../../components/clr-message/ClrMessageService";
import ClrErrorTip from "../../../components/clr-error-tip/ClrErrorTip";
import {ClrSwitchWithSpinner} from "../../../components/clr-switch/ClrSwitch";

interface IMenuWithStatus extends IMenu {
  __toggleStatusIng?: boolean;
}
interface Props {

}

const MenuPage: React.FC<Props> = (props) => {
  const columns: ITableColumn[] = [
    {title: '名称', dataIndex: 'name', width: '160px', align: 'left',},

    {title: '图标', dataIndex: 'icon', width: '160px',align: 'left',},
    {title: '地址', dataIndex: 'url', width: '160px', align: 'left',},
    {title: '排序', dataIndex: 'sort', width: '160px',align: 'left',},
    {title: '状态', dataIndex: 'status', align: 'left', render: (row, index) => {
        return (
          <ClrSwitchWithSpinner spinner={!!row.__toggleStatusIng}
                                inactiveValue={0}
                                activeValue={1}
                                onChange={(e) => {
                                  handleToggleMenuStatus(row.id, index, e.target.value);
                                }} value={row.status}/>
        );
      },},
    {
      title: '操作',
      align: 'center',
      width: '160px',
      render: (row, index, data) => {
        return (
          <>
            <ClrButton onClick={() => {
              handleEditMenu(row as IMenu, index);
            }} size={"small"} type={"primary"}>编辑</ClrButton>
            &nbsp;&nbsp;
            <ClrButton onClick={e => {
              ClrModalService.confirm("确实要删除吗?", {
                async onOk({close, failBack, setLoading}) {
                  setLoading();
                  // @ts-ignore
                  const [, err] = await MenuService.deleteMenu([row.id]);
                  if (err) {
                    failBack();
                    err.showMessage();
                    return;
                  }
                  close();
                  refresh();
                  ClrMessageService.success('删除成功!');
                }
              })
            }} size={"small"} type={"danger"}>删除</ClrButton>
          </>
        );
      }
    }
  ];

  const {data, isLoading, setIsLoading, isError, refresh} = MenuService.useMenuList();

  function handleAddMenu() {
    ClrModalService.openModal(MenuAddModal, {
      title: '添加菜单',
      onComplete() {
        refresh();
      }
    })
  }

  async function handleToggleMenuStatus(id: number, index: number, newValue: any) {
    setIsLoading(true);
    const [, err] = await MenuService.toggleMenuStatus(id, {
      status: newValue,
    });
    setIsLoading(false);
    refresh();
    if (err) {
      err.showMessage();
      return;
    }
  }


  function handleEditMenu(row: IMenu, index: number) {

    ClrModalService.openModal(MenuAddModal, {
      title: '编辑菜单',
      data: row,
      onComplete() {
        refresh();
      }
    });
  }
  return (
    <div className={"frame-content"}>

      <div style={{marginBottom: '20px'}}>
        <ClrButton onClick={handleAddMenu} type={"primary"}>+ 添加菜单</ClrButton>
      </div>
      <ClrErrorTip show={isError} onClick={refresh}/>
      <ClrTreeTableWithSpinner position={"flex-start"} spinner={isLoading} even showText columns={columns} data={data}
                               rowKey={"id"}/>
    </div>
  );
};
export default MenuPage;
