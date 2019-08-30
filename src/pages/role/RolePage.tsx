import React from 'react';
import { Tag} from "antd";
import {ColumnProps} from "antd/lib/table";
import RoleService, {IRole} from "../../services/RoleService";
import RoleAddModal from "./RoleAddModal";
import PageHoc from "../../utils/PageHoc";

interface IProps {

}

const RolePage: React.FC<IProps> = (props) => {
  const columns: ColumnProps<IRole>[] = [
    {title: '账号', dataIndex: 'name', width: 160, align: 'left',},
    {title: '账号', dataIndex: 'desc', width: 200, align: 'left',},
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
  return PageHoc.TableWithPaging<IRole>(
    columns,
    RoleAddModal,
    RoleService,
    '角色'
  );
};
export default RolePage;
