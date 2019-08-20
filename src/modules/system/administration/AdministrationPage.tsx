import React, {PureComponent} from 'react';
import ClrTable, {ITableColumn, ITableData} from "../../../components/clr-table/ClrTable";
import ClrButton from "../../../components/clr-button/ClrButton";
import {openModal} from "../../../components/clr-modal/ClrModalService";
import ClrCheckbox from "../../../components/clr-checkbox/ClrCheckbox";
import ClrRadio from "../../../components/clr-radio/ClrRadio";
import ClrSwitch from "../../../components/clr-switch/ClrSwitch";
import ClrSpinner from "../../../components/clr-spinner/ClrSpinner";
import ClrInput from "../../../components/clr-input/ClrInput";
import {IBanner} from "../../../services/system/BannerService";

interface OwnProps {
}

type Props = OwnProps;

type State = Readonly<{
  data: IBanner[];
  inputValue: string;
}>;

class AdministrationPage extends PureComponent<Props, State> {
  readonly state: State = {
    data: [],
    inputValue: ''
  };
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
    {title: '启用', dataIndex: 'enable', align: 'left', width: '100px',},
    {
      title: '排序', dataIndex: 'sort', align: 'left', render: (row, index) => {
        return (
          <div>
            <ClrCheckbox disabled onChange={value => {
              const newData = [...this.state.data];
              newData[index].enable = value;
              this.setState({
                data: newData
              });
            }} name="city" value={row.enable}>北京</ClrCheckbox>
            <ClrRadio disabled/>
            <ClrSwitch disabled inactiveValue={false} activeValue={true} onChange={value => {
              const newData = [...this.state.data];
              newData[index].enable = value;
              this.setState({
                data: newData
              });
            }} value={row.enable}/>

            <ClrSpinner size="small"/>
          </div>
        );
      }
    },
    {
      title: '操作', align: 'center', width: '160px', render: (row, index, data) => {
        return (
          <>
            <ClrButton onClick={(e) => {
              openModal(<ClrButton>123</ClrButton>, {title: '编辑 Banner'});
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
    // const data = await getBannerList(1);
    // this.setState({
    //   data,
    // })
  }

  render() {
    return (
      <>
        <ClrInput size="small" placeholder="请输入用户名" value={this.state.inputValue} disabled/>
        <ClrInput size="lager" placeholder="请输入用户名" value={this.state.inputValue}/>
        <ClrInput placeholder="请输入密码" onChange={e => {
          this.setState({inputValue: e});
        }} value={this.state.inputValue} type="text"/>
        <br/>
        <br/>
        <br/>
        <br/>
        <ClrTable even size="normal" columns={this.columns} data={this.state.data}/>
      </>
    );
  }
}

export default AdministrationPage;
