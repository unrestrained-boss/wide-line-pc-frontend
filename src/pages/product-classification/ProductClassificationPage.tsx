import React, {useState} from "react";
import "./ProductClassificationPage.scss";
import {ColumnProps} from "antd/lib/table";
import BannerService, {IBanner} from "../../services/BannerService";
import {Alert, Button, Icon, message, Pagination, Table, Tag} from "antd";
import WLModal from "../../components/wl-modal/WLModal";
import BannerAddModal from "../banner/BannerAddModal";

interface IProps {

}

const ProductClassificationPage: React.FC<IProps> = (props: IProps) => {
  const columns: ColumnProps<IBanner>[] = [
    {title: '名称', dataIndex: 'name', width: 200, align: 'left',},
    {title: '描述', dataIndex: 'desc', width: 200, align: 'left',},
    {title: '图片', dataIndex: 'icon', width: 200, align: 'left',},
    {title: '单位', dataIndex: 'unit', width: 200, align: 'left',},
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
                      WLModal.openModal(BannerAddModal, {
                        title: '编辑分类',
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
  const {total, data, isError, isLoading, page, setPage, refresh} = BannerService.useBannerList();

  function handleAddBanner() {
    WLModal.openModal(BannerAddModal, {
      title: '添加分类',
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
        const [, err] = await BannerService.deleteBanner(ids);
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
          添加分类
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

export default ProductClassificationPage;
