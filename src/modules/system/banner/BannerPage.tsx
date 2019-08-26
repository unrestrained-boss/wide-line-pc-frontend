import React, {createRef, RefObject} from 'react';
import {ClrTableWithSpinner, ITableColumn, ITableData} from "../../../components/clr-table/ClrTable";
import {ClrSwitchWithSpinner} from "../../../components/clr-switch/ClrSwitch";
import ClrButton from "../../../components/clr-button/ClrButton";
import ClrModalService from "../../../components/clr-modal/ClrModalService";
import ClrPagination from "../../../components/clr-pagination/ClrPagination";
import BannerAddModal from "./BannerAddModal";
import BannerService, {IBanner} from "../../../services/system/BannerService";
import ClrMessageService from "../../../components/clr-message/ClrMessageService";
import ClrErrorTip from "../../../components/clr-error-tip/ClrErrorTip";

interface Props {
}

interface IBannerWithStatus extends IBanner {
  __toggleStatusIng?: boolean;
}

const BannerPage: React.FC<Props> = (props) => {
  const {total, data, setData, isLoading, isError, page, setPage, refresh} = BannerService.useBannerList();
  const container: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();
  const columns: ITableColumn[] = [
    {title: '名称', dataIndex: 'name', align: 'center', width: '100px'},
    {
      title: '图片',
      dataIndex: 'image',
      align: 'center',
      width: '220px',
      render: (row: ITableData) => {
        return (
          <img src={row.image} width="160px" height="34px" alt=""/>
        );
      }
    },
    {
      title: '链接',
      dataIndex: 'link',
      align: 'left',
      width: '300px',
      render: (row: ITableData) => {
        return (
          <a href={row.link} rel="noopener noreferrer" target="_blank">{row.link}</a>
        );
      }
    },
    {
      title: '启用',
      dataIndex: 'enable',
      align: 'center',
      width: '140px',
      render: (row, index) => {
        return (
          <ClrSwitchWithSpinner spinner={!!row.__toggleStatusIng} inactiveValue={false}
                                activeValue={true}
                                onChange={async (e) => {
                                  handleToggleBannerStatus(row as IBanner, index, e.target.value);
                                }} value={row.enable}/>
        );
      }
    },
    {
      title: '排序', dataIndex: 'sort', align: 'left'
    },
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
    ClrModalService.openModal(BannerAddModal, {title: '新建 BANNER'})
  }
  async function handleToggleBannerStatus(row: IBanner, index: number, newValue: any) {
    let newData = [...data] as IBannerWithStatus[];
    newData[index].__toggleStatusIng = true;
    setData(newData);
    await BannerService.toggleBannerStatus(row.id!, !row.enable);
    newData = [...data];
    newData[index].enable = newValue;
    newData[index].__toggleStatusIng = false;
    setData(newData);
  }

    return (
      <div ref={container} className={"frame-content"}>
        <div style={{marginBottom: '20px'}}>
          <ClrButton onClick={() => handleAddBanner()} type={"primary"}>+ 新建 Banner</ClrButton>
        </div>
        <ClrErrorTip show={isError} onClick={refresh}/>
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

export default BannerPage;
