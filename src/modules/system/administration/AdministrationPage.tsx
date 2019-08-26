import React, {createRef, RefObject} from 'react';
import {RouteComponentProps} from "react-router";
import {ClrTableWithSpinner, ITableColumn} from "../../../components/clr-table/ClrTable";
import ClrButton from "../../../components/clr-button/ClrButton";
import AdministrationService, {IAdministration} from "../../../services/system/AdministrationService";
import ClrModalService from "../../../components/clr-modal/ClrModalService";
import ClrPagination from "../../../components/clr-pagination/ClrPagination";
import AdministrationAddModal from "./AdministrationAddModal";
import {ClrSwitchWithSpinner} from "../../../components/clr-switch/ClrSwitch";
import ClrMessageService from "../../../components/clr-message/ClrMessageService";
import ClrErrorTip from "../../../components/clr-error-tip/ClrErrorTip";

interface Props extends RouteComponentProps {
}

interface IAdministrationWithStatus extends IAdministration {
  __toggleStatusIng?: boolean;
}


const AdministrationPage: React.FC<Props> = (props) => {
  const {total, data, setData, isLoading, isError, page, setPage, refresh} = AdministrationService.useAdministrationList();
  const container: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();
  const columns: ITableColumn[] = [
    {
      title: '账号', dataIndex: 'username', width: '160px', align: 'left'
    },
    {
      title: '头像&昵称', dataIndex: 'nickname', width: '200px', render: (row) => {
        return (
          <>
            <img src={row.avatar} style={{height: '30px', width: '30px', verticalAlign: 'middle', borderRadius: '5px'}}
                 alt=""/>&nbsp;&nbsp;
            <span>{row.nickname}</span>
          </>
        );
      },
    },

    {title: '电话号码', dataIndex: 'mobile', width: '120px'},
    {title: '邮箱', dataIndex: 'email', width: '300px'},
    {
      title: '状态', dataIndex: 'status', render: (row, index) => {
        return (
          <ClrSwitchWithSpinner spinner={!!row.__toggleStatusIng}
                                inactiveValue={0}
                                activeValue={1}
                                onChange={(e) => {
                                  handleToggleAdministrationStatus(row.id, index, e.target.value);
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
            <ClrButton onClick={() => handleEditAdministration(row as IAdministration, index)}
                       type="primary"
                       size={"small"}>编辑</ClrButton>
            &nbsp;&nbsp;
            <ClrButton onClick={e => {
              ClrModalService.confirm("确实要删除吗?", {
                async onOk({close, failBack, setLoading}) {
                  setLoading();
                  // @ts-ignore
                  const [, err] = await AdministrationService.deleteAdministration([row.id]);
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
            }}
                       type="danger"
                       size={"small"}>删除</ClrButton>
          </>
        );
      }
    },
  ];

  async function handleToggleAdministrationStatus(id: number, index: number, newValue: any) {
    let newData = [...data] as IAdministrationWithStatus[];
    const oldValue = newData[index].status;
    newData[index].__toggleStatusIng = true;
    newData[index].status = newValue;
    setData(newData);
    const [, err] = await AdministrationService.toggleAdministrationStatus(id, {
      status: newValue,
    });
    newData = [...data] as IAdministrationWithStatus[];
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

  function handleAddAdministration() {
    ClrModalService.openModal(AdministrationAddModal, {
      title: '添加管理员',
      onComplete() {
        refresh();
      }
    });
  }

  function handleEditAdministration(row: IAdministration, index: number) {
    ClrModalService.openModal(AdministrationAddModal, {
      title: '编辑管理员',
      data: row,
      onComplete() {
        refresh();
      }
    });
  }

  //
  // function handleDelete({row}: any) {
  //   ClrModalService.confirm("确实要删除吗?", {
  //     async onOk({close, failBack, setLoading}) {
  //       setLoading();
  //       // @ts-ignore
  //       const [, err] = await AdministrationService.deleteAdministration([row.id]);
  //       if (err) {
  //         failBack();
  //         err.showMessage();
  //         return;
  //       }
  //       close();
  //       refresh();
  //       ClrMessageService.success('删除成功!');
  //     }
  //   })
  // }
  return (
    <div className={"frame-content"} ref={container}>
      <div style={{marginBottom: '20px'}}>
        <ClrButton onClick={handleAddAdministration} type={"primary"}>+ 添加管理员</ClrButton>
      </div>
      <ClrErrorTip show={isError} onClick={refresh}/>
      <ClrTableWithSpinner position={"flex-start"} spinner={isLoading} even showText columns={columns} data={data || []}/>

      <ClrPagination disabled={isLoading} total={total} page={page} pageSize={20} onChange={page => {
        container.current!.scrollTop = 0;
        setPage(page);
      }}/>
    </div>
  );
};

export default AdministrationPage;
