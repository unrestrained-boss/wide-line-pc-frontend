import React, {useState} from 'react';
import {Alert, Button, Icon, message, Pagination, Table, Tag} from "antd";
import {ColumnProps} from "antd/lib/table";
import WLModal from "../../components/wl-modal/WLModal";
import BannerItemAddModal from "./BannerItemAddModal";
import BannerItemService, {IBannerItem} from "../../services/BannerItemService";

interface Props {

}

const BannerItemPage: React.FC<Props> = (props) => {
  const columns: ColumnProps<IBannerItem>[] = [
    {title: '类型', dataIndex: 'type', width: 200, align: 'left',},
    {
      title: 'banner', dataIndex: 'img', width: 240, align: 'center', render: (text) => {
        return (
          <img style={{height: '80px', width: '200px'}}
               src={text}
               alt=""/>
        );
      }
    },
    {title: '链接地址', dataIndex: 'value', width: 200, align: 'left',},
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
                    type={"link"}
                    onClick={() => {
                      WLModal.openModal(BannerItemAddModal, {
                        title: '编辑banner',
                        data: row,
                        defaultCanDismiss: false,
                        onComplete() {
                          refresh();
                        }
                      });
                    }}>编辑</Button>
            &nbsp;
            <Button size={"small"}
                    type={"link"}
                    onClick={() => handleDelete([row.id!])}>删除</Button>
          </>
        );
      }
    },
  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[] | number[]>([]);
  const {total, data, isError, isLoading, page, setPage, refresh} = BannerItemService.useBannerItemList();

  function handleAddBanner() {
    WLModal.openModal(BannerItemAddModal, {
      title: '添加banner',
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
        const [, err] = await BannerItemService.deleteBannerItem(ids);
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
        <Button onClick={handleAddBanner} type={"primary"}>
          <Icon type={"plus"}/>
          添加 banner
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

export default BannerItemPage;
