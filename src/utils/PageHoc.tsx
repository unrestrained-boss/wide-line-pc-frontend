import React, {useState} from "react";
import {ColumnProps, TableProps} from "antd/lib/table";
import {Alert, Button, Icon, message, Pagination, Table} from "antd";
import WLModal from "../components/wl-modal/WLModal";
import {NewBaseService} from "../services/BaseService";

interface ITablePageOption<T> {
  pagination?: boolean;
  tableProps?: TableProps<T>;
}
function TablePage<T extends {id?: number}>(
  columns: ColumnProps<T>[],
  modal: any,
  service: NewBaseService<T>,
  label: string,
  options?: ITablePageOption<T>,
) {
  options = options || {};
  const { tableProps = {}, pagination = true } = options;
  columns.push({
    title: '操作', align: 'center', width: 120, render: (_, row) => {
      return (
        <>
          <Button size={"small"}
                  type={"primary"}
                  onClick={() => handleEdit(row)}>编辑</Button>
          &nbsp;
          <Button size={"small"}
                  type={"danger"}
                  onClick={() => handleDel([row.id!])}>删除</Button>
        </>
      );
    }
  },);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[] | number[]>([]);
  const {total, data, isLoading, isError, page, setPage, refresh} = !pagination ?  service.useList() : service.useListWithPaging();

  function handleAdd() {
    WLModal.openModal(modal, {
      title: '添加' + label,
      defaultCanDismiss: false,
      onComplete() {
        refresh();
      }
    });
  }
  function handleEdit(row: T) {
    WLModal.openModal(modal, {
      title: '编辑' + label,
      data: row,
      defaultCanDismiss: false,
      onComplete() {
        refresh();
      }
    });
  }
  function handleDel(ids: number[], clearSelectedRowKeys = false) {
    WLModal.confirm("确实要删除吗?", {

      async onOk({setLoading, close, failBack}) {
        setLoading();
        const [, err] = await service.remove(ids);
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
        <Button onClick={handleAdd} type={"primary"}>
          <Icon type={"plus"}/>
          添加{label}
        </Button>
        &nbsp;
        <Button onClick={() => handleDel(selectedRowKeys as number[], true)}
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
             {...tableProps}
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
      {pagination && (
        <Pagination style={{marginTop: '20px', textAlign: 'right'}} current={page}
                    pageSize={20}
                    disabled={isLoading}
                    hideOnSinglePage={false}
                    onChange={page => setPage(page)}
                    total={total}/>
      )}
    </div>
  );
}


const PageHoc = {
  TablePage,
};

export default PageHoc;
