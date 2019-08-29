import React from 'react';
import BannerService, {IBanner} from "../../../services/system/BannerService";
import {Alert, Button, Icon, message, Table, Tag} from "antd";
import {ColumnProps} from "antd/lib/table";
import WLModal from "../../../components/wl-modal/WLModal";
import BannerAddModal from "./BannerAddModal";

interface Props {

}

const BannerPage: React.FC<Props> = (props) => {
  const columns: ColumnProps<IBanner>[] = [
    {title: '名称', dataIndex: 'name', width: 200, align: 'left',},
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
                    onClick={() => {
                      WLModal.confirm("确实要删除吗?", {
                        async onOk({setLoading, close, failBack}) {
                          setLoading();
                          const [, err] = await BannerService.deleteBanner([row.id!]);
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
  const {data, isError, isLoading, refresh} = BannerService.useBannerList();

  function handleAddBanner() {
    WLModal.openModal(BannerAddModal, {
      title: '添加分类',
      defaultCanDismiss: false,
      onComplete() {
        refresh();
      }
    });
  }

  return (
    <div className={"frame-content"}>
      <div style={{marginBottom: '20px'}}>
        <Button onClick={handleAddBanner} type={"primary"}>
          <Icon type={"plus"}/>
          添加 banner 分类
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
    </div>
  );
};

export default BannerPage;
