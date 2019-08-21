import React, {createRef, PureComponent, RefObject} from 'react';
import {getBannerList, IBanner, toggleBannerStatus} from "../../../services/system/BannerService";
import {ClrTableWithSpinner, ITableColumn, ITableData} from "../../../components/clr-table/ClrTable";
import {ClrSwitchWithSpinner} from "../../../components/clr-switch/ClrSwitch";
import ClrButton from "../../../components/clr-button/ClrButton";
import {openModal} from "../../../components/clr-modal/ClrModalService";
import ClrPagination from "../../../components/clr-pagination/ClrPagination";
import BannerAddModal from "./BannerAddModal";

interface OwnProps {
}

interface IBannerWithStatus extends IBanner {
  __toggleStatusIng?: boolean;
}

type Props = OwnProps;

type State = Readonly<{
  data: IBannerWithStatus[];
  loading: boolean;
  page: number;
  total: number;
}>;

class BannerPage extends PureComponent<Props, State> {
  readonly state: State = {
    data: [],
    loading: false,
    page: 1,
    total: 1,
  };
  container: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();
  columns: ITableColumn[] = [
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
      width: '200px',
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
                                onChange={async (value: any) => {
                                  this.handleToggleBannerStatus(row as IBanner, index, value);
                                }} value={row.enable}/>
        );
      }
    },
    {title: '排序', dataIndex: 'sort', align: 'left',},
    {
      title: '操作',
      align: 'center',
      width: '160px',
      render: (row, index, data) => {
        return (
          <>
            <ClrButton onClick={() => {
              openModal((close: () => void) => <BannerAddModal close={close} data={row as IBanner}/>, {title: '编辑 Banner'});
            }} type="primary">编辑</ClrButton>
            &nbsp;&nbsp;
            <ClrButton onClick={e => console.log(row, index, data, e)} type="danger">删除</ClrButton>
          </>
        );
      }
    },
  ];

  componentDidMount(): void {
    this.fetch();
  }

  async fetch() {
    this.setState({
      loading: true,
    });
    const {total, data} = await getBannerList(this.state.page, 15);
    this.setState({
      data,
      total,
      loading: false,
    })
  }

  async handleToggleBannerStatus(row: IBanner, index: number, newValue: any) {
    let newData = [...this.state.data];
    newData[index].__toggleStatusIng = true;
    this.setState({
      data: newData,
    });
    await toggleBannerStatus(row.id, !row.enable);
    newData = [...this.state.data];
    newData[index].enable = newValue;
    newData[index].__toggleStatusIng = false;
    this.setState({
      data: newData,
    });


  }

  render() {
    return (
      <div ref={this.container} className={"frame-content"}>
        <ClrTableWithSpinner spinner={this.state.loading}
                             showText
                             even
                             size="normal"
                             columns={this.columns}
                             data={this.state.data}/>
        <ClrPagination disabled={this.state.loading} onChange={page => {
          this.container.current!.scrollTop = 0;
          this.setState({page}, () => {
            this.fetch();
          });
        }} total={this.state.total} page={this.state.page} pageSize={20}/>
      </div>
    );
  }
}

export default BannerPage;
