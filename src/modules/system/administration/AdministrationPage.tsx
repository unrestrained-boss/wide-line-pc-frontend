import React, {useEffect, useState} from 'react';
import {RouteComponentProps} from "react-router";
import ClrTable, {ITableColumn} from "../../../components/clr-table/ClrTable";
import ClrButton from "../../../components/clr-button/ClrButton";
import AdministrationService, {IAdministration} from "../../../services/system/AdministrationService";
import ClrModalService from "../../../components/clr-modal/ClrModalService";
import BannerAddModal from "../banner/BannerAddModal";

interface Props extends RouteComponentProps {
}


const AdministrationPage: React.FC<Props> = (props) => {
  const [data, setData] = useState<IAdministration[]>([]);
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
              ClrModalService.alert("H啊哈哈")
            }} type="danger">删除</ClrButton>
          </>
        );
      }
    },
  ];
  function handleAddAdministration() {

  }
  useEffect(() => {
    async function fetch() {
      const data = await AdministrationService.getAdministrationList(1);
      setData(data.data);
    }
    fetch();
  }, []);
  return (
    <div className={"frame-content"}>
      <div style={{marginBottom: '20px'}}>
        <ClrButton onClick={handleAddAdministration} type={"primary"}>+ 添加管理员</ClrButton>
      </div>
      <ClrTable columns={columns} data={data}/>
    </div>
  );
};

export default AdministrationPage;
