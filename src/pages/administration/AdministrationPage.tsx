import React, {useState} from 'react';
import {Table, Button, Icon, Pagination, Alert, Tag, message} from 'antd';
import {ColumnProps} from "antd/lib/table";
import AdministrationService, {IAdministration} from "../../services/AdministrationService";
import WLModal from "../../components/wl-modal/WLModal";
import AdministrationAddModal from "./AdministrationAddModal";

interface Props {

}

const AdministrationPage: React.FC<Props> = (props) => {
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
    {
      title: '操作', align: 'center', width: 120, render: (_, row) => {
        return (
          <>
            <Button size={"small"}
                    type={"primary"}
                    onClick={() => {
                      WLModal.openModal(AdministrationAddModal, {
                        title: '编辑管理员',
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
                    onClick={() => handleDelete([row.id!])}>删除</Button>
          </>
        );
      }
    },
  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[] | number[]>([]);
  const {total, data, isLoading, isError, page, setPage, refresh} = AdministrationService.useAdministrationList();

  function handleAddAdministration() {
    WLModal.openModal(AdministrationAddModal, {
      title: '添加管理员',
      defaultCanDismiss: false,
      onComplete() {
        refresh();
      }
    });

  }

  function handleDelete(ids: number[], clearSelectedRowKeys = false) {
    WLModal.confirm("确实要删除吗?", {
      async onOk({setLoading, close, failBack}) {
        setLoading();
        const [, err] = await AdministrationService.deleteAdministration(ids);
        if (err) {
          err.showMessage();
          failBack();
          return;
        }
        close();
        refresh();
        if (clearSelectedRowKeys) {
          setSelectedRowKeys([]);
        }
        message.success('删除成功!');
      }
    });

  }

  return (
    <div className={"frame-content"}>
      <div style={{marginBottom: '20px'}}>
        <Button onClick={handleAddAdministration} type={"primary"}>
          <Icon type={"plus"}/>
          添加管理员
        </Button>
        &nbsp;
        <Button onClick={() => handleDelete(selectedRowKeys as number[], true)}
                disabled={selectedRowKeys.length === 0}
                type={"danger"}>
          <Icon type={"delete"}/>
          批量删除
        </Button>
      </div>

      {isError && (
        <Alert style={{margin: '0 0 20px 0'}}
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
      <Table size={"small"}
             rowSelection={{
               selectedRowKeys,
               onChange: e => setSelectedRowKeys(e),
             }}
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
export default AdministrationPage;
