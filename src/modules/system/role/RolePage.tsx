import React from 'react';
import {Alert, Button, Icon, message, Pagination, Table, Tag} from "antd";
import {ColumnProps} from "antd/lib/table";
import RoleService, {IRole} from "../../../services/system/RoleService";
import WLModal from "../../../components/wl-modal/WLModal";
import RoleAddModal from "./RoleAddModal";

interface Props {

}

const RolePage: React.FC<Props> = (props) => {
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
    {
      title: '操作', align: 'center', width: 120, render: (_, row) => {
        return (
          <>
            <Button size={"small"}
                    type={"primary"}
                    onClick={() => {
                      WLModal.openModal(RoleAddModal, {
                        title: '编辑角色',
                        data: row,
                        defaultCanDismiss: false,
                        onComplete() {
                          refresh();
                        }
                      });
                    }}>编辑</Button>
            &nbsp;
            <Button size={"small"}
                    type={"danger"}
                    onClick={() => {
                      WLModal.confirm("确实要删除吗?", {
                        async onOk({setLoading, close, failBack}) {
                          setLoading();
                          const [, err] = await RoleService.deleteRole([row.id!]);
                          if (err) {
                            err.showMessage();
                            failBack();
                            return;
                          }
                          close();
                          refresh();
                          message.success('删除成功!');
                        }
                      });
                    }}>删除</Button>
          </>
        );
      }
    },
  ];
  const {total, data, isLoading, isError, page, setPage, refresh} = RoleService.useRoleList();
  function handleAddRole() {
    WLModal.openModal(RoleAddModal, {
      title: '添加角色',
      defaultCanDismiss: false,
      onComplete() {
        refresh();
      }
    });
  }
  return (
    <div className={"frame-content"}>
      <div style={{marginBottom: '20px', textAlign: 'right'}}>
        <Button onClick={handleAddRole} type={"primary"}>
          <Icon type={"plus"}/>
          添加角色
        </Button>

        {isError && (
          <Alert style={{marginTop: '20px'}}
                 showIcon
                 message={"抱歉"}
                 description={(
                   <>
                     <span>出现了一点问题, 请稍后再试或</span>
                     <Button type={"link"} onClick={() => refresh()}>点击重试</Button>
                   </>
                 )}
                 type="error"
                 closable
          />
        )}
      </div>
      <Table size={"small"}
             bordered
             loading={{
               spinning: isLoading,
               delay: 250,
             }}
             locale={{
               emptyText: isLoading ? '拼命加载中...' : '抱歉, 暂无数据'
             }}
             pagination={false}
             rowKey={"id"}
             columns={columns}
             dataSource={data}/>
      <Pagination style={{marginTop: '20px', textAlign: 'right'}} current={page}
                  pageSize={20}
                  disabled={isLoading}
                  hideOnSinglePage
                  onChange={page => setPage(page)}
                  total={total}/>
    </div>
  );
};
export default RolePage;
