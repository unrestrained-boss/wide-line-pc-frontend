import React, {PureComponent} from 'react';
import ClrTable, {ITableColumn, ITableData} from "../../../components/clr-table/ClrTable";
import ClrButton from "../../../components/clr-button/ClrButton";
import {openModal} from "../../../components/clr-modal/ClrModalService";

interface OwnProps {
}

type Props = OwnProps;

type State = Readonly<{
  columns: ITableColumn[];
  data: ITableData[];
}>;

class AdministrationPage extends PureComponent<Props, State> {
  readonly state: State = {
    columns: [
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
      {title: '启用', dataIndex: 'enable', align: 'left', width: '100px',},
      {title: '排序', dataIndex: 'sort', align: 'left'},
      {
        title: '操作', align: 'center', width: '160px', render: (row, index, data) => {
          return (
            <>
              <ClrButton onClick={(e) => {
                openModal(<ClrButton>123</ClrButton>, { title: '编辑 Banner'});
              }} type="primary">编辑</ClrButton>
              &nbsp;&nbsp;
              <ClrButton onClick={e => console.log(row, index, data, e)} type="danger">删除</ClrButton>
            </>
          );
        }
      },
    ],
    data: [
      {
        id: 1,
        name: '好酒',
        image: 'https://img13.360buyimg.com/img/jfs/t1/79625/4/7282/87331/5d53a2b0E0a73c40e/394aff7e452ab18a.jpg',
        link: 'https://www.baidu.com/',
        enable: true,
        sort: 1
      },
      {
        id: 2,
        name: '好酒1',
        image: 'https://img13.360buyimg.com/img/jfs/t1/79625/4/7282/87331/5d53a2b0E0a73c40e/394aff7e452ab18a.jpg',
        link: 'https://www.baidu.com/',
        enable: false,
        sort: 2
      },
      {
        id: 3,
        name: '好酒2',
        image: 'https://img13.360buyimg.com/img/jfs/t1/79625/4/7282/87331/5d53a2b0E0a73c40e/394aff7e452ab18a.jpg',
        link: 'https://www.baidu.com/',
        enable: true,
        sort: 3
      }
    ]
  };

  render() {
    return (
      <ClrTable even size="normal" columns={this.state.columns} data={this.state.data}/>
    );
  }
}

export default AdministrationPage;
