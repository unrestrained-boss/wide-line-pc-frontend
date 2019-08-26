import React, {createRef, RefObject} from "react";
import {RouterProps} from "react-router";
import RoleService, {IRole} from "../../../services/system/RoleService";
import {ClrTableWithSpinner, ITableColumn} from "../../../components/clr-table/ClrTable";
import ClrButton from "../../../components/clr-button/ClrButton";
import ClrModalService from "../../../components/clr-modal/ClrModalService";
import ClrMessageService from "../../../components/clr-message/ClrMessageService";
import ClrPagination from "../../../components/clr-pagination/ClrPagination";
import RoleAddModal from "./RoleAddModal";
import {ClrSwitchWithSpinner} from "../../../components/clr-switch/ClrSwitch";

interface Props extends RouterProps {

}

interface IRoleWithStatus extends IRole {
  __toggleStatusIng?: boolean;
}

const RolePage: React.FC<Props> = (props) => {
  const {total, data, setData, isLoading, isError, page, setPage, refresh} = RoleService.useRoleList();
  const container: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();
  const columns: ITableColumn[] = [
    {title: '名称', dataIndex: 'name', align: 'center', width: '200px'},
    {title: '描述', dataIndex: 'desc', align: 'center', width: '400px'},
    {
      title: '状态', dataIndex: 'status', align: 'left', render: (row, index) => {
        return (
          <ClrSwitchWithSpinner spinner={!!row.__toggleStatusIng}
                                inactiveValue={0}
                                activeValue={1}
                                onChange={(e) => {
                                  handleToggleRoleStatus(row.id, index, e.target.value);
                                }} value={row.status}/>
        );
      },
    },
    {
      title: '操作',
      align: 'center',
      width: '160px',
      render: (row, index, data) => {
        return (
          <>
            <ClrButton onClick={() => {
              handleEditRole(row as IRole, index);
            }}
                       type="primary"
                       size={"small"}>编辑</ClrButton>
            &nbsp;&nbsp;
            <ClrButton onClick={e => {
              ClrModalService.confirm('确实要删除吗?', {
                async onOk({close, setLoading, failBack}) {
                  setLoading();
                  // @ts-ignore
                  const [, err] = await RoleService.deleteRole([row.id]);
                  if (err) {
                    failBack();
                    err.showMessage();
                    return;
                  }
                  close();
                  refresh();
                  ClrMessageService.success('删除成功!');
                },
              });
            }}
                       type="danger"
                       size={"small"}>删除</ClrButton>
          </>
        );
      }
    },
  ];

  async function handleToggleRoleStatus(id: number, index: number, newValue: any) {
    let newData = [...data] as IRoleWithStatus[];
    const oldValue = newData[index].status;
    newData[index].__toggleStatusIng = true;
    newData[index].status = newValue;
    setData(newData);
    const [, err] = await RoleService.toggleRoleStatus(id, {
      status: newValue,
    });
    newData = [...data] as IRoleWithStatus[];
    newData[index].__toggleStatusIng = false;

    if (err) {
      err.showMessage();
      newData[index].status = oldValue;
      setData(newData);
      return;
    }
    newData = [...data];
    setData(newData);
  }

  function handleAddRole() {
    ClrModalService.openModal(RoleAddModal, {
      title: '新建角色',
      onComplete() {
        refresh();
      }
    });
  }

  function handleEditRole(row: IRole, index: number) {

    ClrModalService.openModal(RoleAddModal, {
      title: '编辑角色',
      data: row,
      onComplete() {
        refresh();
      }
    });
  }

  return (
    <div ref={container} className={"frame-content"}>
      <div style={{marginBottom: '20px'}}>
        <ClrButton onClick={() => handleAddRole()} type={"primary"}>+ 新建角色</ClrButton>
      </div>
      {isError && (
        <div className={"list-error-tip"}>
          Sorry, 发生了一点小错误, 请稍后再来或者
          <button onClick={() => refresh()} className="error-retry-button">点击重试</button>
        </div>
      )}
      <ClrTableWithSpinner position={"flex-start"} spinner={isLoading}
                           showText
                           even
                           size="normal"
                           columns={columns}
                           data={data}/>
      <ClrPagination disabled={isLoading} onChange={page => {
        container.current!.scrollTop = 0;
        setPage(page);
      }} total={total} page={page} pageSize={20}/>
    </div>
  );
};
export default RolePage;
