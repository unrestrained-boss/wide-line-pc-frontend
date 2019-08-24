import React, {createRef, RefObject} from 'react';
import {RouteComponentProps} from "react-router";
import {ClrTableWithSpinner, ITableColumn} from "../../../components/clr-table/ClrTable";
import ClrButton from "../../../components/clr-button/ClrButton";
import AdministrationService from "../../../services/system/AdministrationService";
import ClrModalService from "../../../components/clr-modal/ClrModalService";
import BannerAddModal from "../banner/BannerAddModal";
import ClrPagination from "../../../components/clr-pagination/ClrPagination";
import ClrMessageService from "../../../components/clr-message/ClrMessageService";

interface Props extends RouteComponentProps {
}


const AdministrationPage: React.FC<Props> = (props) => {
  const {total, data, isLoading, isError, page, setPage} = AdministrationService.useAdministrationList();
  const container: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();
  const columns: ITableColumn[] = [
    // { title: 'ID', dataIndex: 'id', width: '60px' },
    { title: '账号', dataIndex: 'username', width: '160px', align: 'center' },
    { title: '备注', dataIndex: 'remarks', width: '200px' },
    { title: '姓名', dataIndex: 'name', width: '120px' },
    { title: '电话号码', dataIndex: 'phone', width: '200px'},
    { title: '角色权限', dataIndex: 'permits',  },
    {
      title: '操作',
      align: 'center',
      width: '160px',
      render: (row, index, data) => {
        return (
          <>
            <ClrButton onClick={() => {
              ClrModalService.openModal(BannerAddModal, {title: '编辑 BANNER', data: row});
            }} type="primary">编辑</ClrButton>
            &nbsp;&nbsp;
            <ClrButton onClick={e => {
              ClrModalService.alert("H啊哈哈", {})
            }} type="danger">删除</ClrButton>
          </>
        );
      }
    },
  ];
  function handleAddAdministration() {
    ClrMessageService.success('sddsds')
  }

  return (
    <div className={"frame-content"} ref={container}>
      <div style={{marginBottom: '20px'}}>
        <ClrButton onClick={handleAddAdministration} type={"primary"}>+ 添加管理员</ClrButton>
      </div>
      <div style={{textAlign: 'center'}}>
        {isError && <span>出错了, 请稍后再试!</span>}
      </div>
      <ClrTableWithSpinner position={"flex-start"} spinner={isLoading} showText columns={columns} data={data}/>
      <ClrPagination disabled={isLoading} total={total} page={page} pageSize={20} onChange={page => {
        container.current!.scrollTop = 0;
        setPage(page);
      }}/>
    </div>
  );
};

export default AdministrationPage;
