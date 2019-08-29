import React from 'react';
import MenuService, {IMenu} from "../../../services/system/MenuService";
import {ColumnProps} from "antd/lib/table";
import {Alert, Button, Icon, message, Table, Tag} from "antd";
import WLModal from "../../../components/wl-modal/WLModal";
import MenuAddModal from "./MenuAddModal";

interface Props {

}

const MenuPage: React.FC<Props> = (props) => {
  const columns: ColumnProps<IMenu>[] = [
    {title: '名称', dataIndex: 'name', width: 500, align: 'left',},
    {title: '图标', dataIndex: 'icon', width: 200, align: 'left',},
    {title: '链接', dataIndex: 'url', width: 200, align: 'left',},
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
      title: '操作', align: 'center', width: 140, render: (_, row) => {
        return (
          <>
            <Button size={"small"}
                    type={"primary"}
                    onClick={() => {
                      WLModal.openModal(MenuAddModal, {
                        title: '编辑菜单',
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
                          const [, err] = await MenuService.deleteMenu([row.id!]);
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
  const {data, isError, isLoading, refresh} = MenuService.useMenuList();

  function handleAddMenu() {
    WLModal.openModal(MenuAddModal, {
      title: '添加菜单',
      defaultCanDismiss: false,
      onComplete() {
        refresh();
      }
    });
  }

  return (
    <div className={"frame-content"}>
      <div style={{marginBottom: '20px'}}>
        <Button onClick={handleAddMenu} type={"primary"}>
          <Icon type={"plus"}/>
          添加菜单
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
      <Table rowKey={"id"}
             size={"small"}
             pagination={false}
             columns={columns}
             dataSource={data}
             bordered
             loading={{
               spinning: isLoading,
               delay: 250,
             }}
             locale={{
               emptyText: isLoading ? '拼命加载中...' : '抱歉, 暂无数据'
             }}
      />
    </div>
  );
};

export default MenuPage;
