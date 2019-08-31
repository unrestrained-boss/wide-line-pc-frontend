import React from 'react';
import {Tag} from 'antd';
import {ColumnProps} from "antd/lib/table";
import AdministrationService, {IAdministration} from "../../services/AdministrationService";
import AdministrationAddModal from "./AdministrationAddModal";
import PageHoc from "../../utils/PageHoc";

interface IProps {

}

const AdministrationPage: React.FC<IProps> = (props) => {
  const columns: ColumnProps<IAdministration>[] = [
    {title: '账号', dataIndex: 'username', width: 160, align: 'left',},
    {
      title: '头像&昵称', dataIndex: 'nickname', width: 200, align: 'left', render: (_, row) => {
        return (
          <>
            <img src={row.avatar as string}
                 style={{height: '30px', width: '30px', verticalAlign: 'middle', borderRadius: '5px'}}
                 alt=""/>&nbsp;&nbsp;
            <span>{row.nickname}</span>
          </>
        );
      }
    },
    {title: '电话号码', dataIndex: 'mobile', width: 140},
    {title: '邮箱', dataIndex: 'email', width: 300},
    {
      title: '状态', dataIndex: 'status', render: (text) => {
        return (
          <Tag color={text === 1 ? 'blue' : 'red'}>
            {text === 1 ? '启用' : '禁用'}
          </Tag>
        );
      }
    },
  ];

  return PageHoc.TablePage<IAdministration>(
    columns,
    AdministrationAddModal,
    AdministrationService,
    '管理员'
  );
};
export default AdministrationPage;
