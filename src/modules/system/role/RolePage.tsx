import React, {createRef, RefObject} from "react";
import {RouterProps} from "react-router";
import RoleService from "../../../services/system/RoleService";
import {ClrTableWithSpinner, ITableColumn} from "../../../components/clr-table/ClrTable";
import ClrButton from "../../../components/clr-button/ClrButton";
import ClrModalService from "../../../components/clr-modal/ClrModalService";
import BannerAddModal from "../banner/BannerAddModal";
import ClrMessageService from "../../../components/clr-message/ClrMessageService";
import ClrPagination from "../../../components/clr-pagination/ClrPagination";

interface Props extends RouterProps {

}
const RolePage: React.FC<Props> = (props) => {
  const {total, data, isLoading, isError, page, setPage} = RoleService.useRoleList();
  const container: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();
  const columns: ITableColumn[] = [
    {title: '名称', dataIndex: 'name', align: 'center', width: '200px'},
    {title: '描述', dataIndex: 'desc', align: 'center', width: '400px'},
    {title: '状态', dataIndex: 'status', align: 'center',},
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
              ClrModalService.confirm(`
              确实要删除吗?
              
              `, {
                onOk({ close, setLoading, failBack }) {
                  setLoading();
                  setTimeout(() => {
                    console.log('sok');
                    ClrMessageService.error('sdsd');
                    failBack();
                  }, 3000)
                },
              });
            }} type="danger">删除</ClrButton>
          </>
        );
      }
    },
  ];
  function handleAddBanner() {

  }
  return (
    <div ref={container} className={"frame-content"}>
      <div style={{marginBottom: '20px'}}>
        <ClrButton onClick={() => handleAddBanner()} type={"primary"}>+ 新建角色</ClrButton>
      </div>
      <div style={{textAlign: 'center', marginBottom: '20px'}}>
        {isError && (
          <span>出错了, 请尝试&nbsp;&nbsp;&nbsp;<ClrButton size={"small"} outline type={"danger"} onClick={() => refresh()}>点击重试</ClrButton></span>
        )}
      </div>
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
