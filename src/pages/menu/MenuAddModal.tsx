import React, {useEffect, useMemo, useState} from "react";
import {Button, Form, Input, Switch, Spin, message, TreeSelect, Alert, InputNumber, Select} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {IWLModalInjectProps} from "../../components/wl-modal/WLModal";
import MenuService, {IMenu} from "../../services/MenuService";
import Tool from "../../utils/Tool";

interface IProps extends FormComponentProps<IMenu>, IWLModalInjectProps {
}

const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};
const MenuAddModal: React.FC<IProps> = (props) => {
  const preData = props.getPreData<IMenu>();
  const isEditMode = preData !== undefined;
  const [submitting, setSubmitting] = useState(false);
  const {getFieldDecorator, validateFieldsAndScroll, setFieldsValue} = props.form;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    validateFieldsAndScroll((error, values) => {
      if (error) {
        return;
      }
      handleDoSubmit(values);
    });
  }

  function handleDoSubmit(values: IMenu) {
    props.setCanClosable(false);
    setSubmitting(true);
    const body: IMenu = {
      name: values.name,
      icon: values.icon,
      url: values.url,
      status: values.status ? 1 : 0,
      sort: values.sort,
      pid: values.pid,
    };
    if (isEditMode) {
      handleEditSubmit(body);
    } else {
      handleAddSubmit(body);
    }
  }

  async function handleAddSubmit(values: IMenu) {
    const [, err] = await MenuService.add(values);
    props.setCanClosable(true);
    setSubmitting(false);
    if (err) {
      err.showMessage();
      return;
    }
    props.close();
    props.onComplete!();
    message.success('添加成功!');
  }

  async function handleEditSubmit(values: IMenu) {
    const [, err] = await MenuService.update(preData.id!, values);
    props.setCanClosable(true);
    setSubmitting(false);
    if (err) {
      err.showMessage();
      return;
    }
    props.close();
    props.onComplete!();
    message.success('编辑成功!');
  }

  useEffect(() => {
    if (isEditMode) {
      setFieldsValue({
        name: preData.name,
        icon: preData.icon,
        url: preData.url,
        status: preData.status === 1,
        pid: preData.pid,
      });
    }
    // eslint-disable-next-line
  }, []);
  const {data: menuData, isLoading: menuIsLoading, isError: menuIsError, refresh: menuRefresh} = MenuService.useList();
  const {data: urlData, isLoading: urlIsLoading, isError: urlIsError, refresh: urlRefresh} = MenuService.useMenuList();
  const treeData = useMemo(() => {
    return [
      {
        title: '根目录',
        value: 0,
        children: Tool.transformTitleAndValue(menuData, [], 'name', 'id'),
      }
    ];
  }, [menuData]);
  return (
    <Spin spinning={submitting || menuIsLoading || urlIsLoading}>
      {(menuIsError || urlIsError) && (
        <Alert style={{marginTop: '20px'}}
               showIcon
               message={"抱歉"}
               description={(
                 <>
                   <span>出现了一点问题, 请稍后再试或</span>
                   <Button type={"link"} onClick={() => {
                     menuRefresh();
                     urlRefresh();
                   }}>点击重试</Button>
                 </>
               )}
               type="error"
               closable
        />
      )}
      <Form layout={"horizontal"} onSubmit={e => handleSubmit(e)}>
        <Form.Item label={"菜单名称"} {...formItemLayout}>
          {getFieldDecorator('name', {
            rules: [{required: true, message: '请输入菜单名称'}],
          })(<Input autoFocus placeholder={"请输入菜单名称"}/>)}
        </Form.Item>
        <Form.Item label={"菜单图标"} {...formItemLayout}>
          {getFieldDecorator('icon', {
            rules: [{required: true, message: '请输入菜单图标'}],
          })(<Input placeholder={"请输入菜单图标"}/>)}
        </Form.Item>
        <Form.Item label={"菜单排序"} {...formItemLayout}>
          {getFieldDecorator('sort', {
            rules: [{required: true, message: '请输入菜单排序'}],
            initialValue: 0,
          })(<InputNumber min={0} placeholder={"请输入菜单排序"}/>)}
        </Form.Item>
        <Form.Item label={"链接地址"} {...formItemLayout}>
          {getFieldDecorator('url', {
            rules: [{required: true, message: '请选择链接地址'}],
          })(<Select showSearch
                     placeholder={"请选择链接地址"}>
            {urlData.map(urlItem => {
              return (
                <Select.Option key={urlItem.uri}>{urlItem.uri}</Select.Option>
              );
            })}
          </Select>)}
        </Form.Item>
        <Form.Item label={"上级菜单"} {...formItemLayout}>
          {getFieldDecorator('pid', {
            rules: [{required: true, message: '请选择上级菜单'}],
            initialValue: 0,
          })(<TreeSelect treeData={treeData}
                         treeDefaultExpandAll
                         placeholder={"请选择上级菜单"}/>)}
        </Form.Item>

        <Form.Item label={"状态"} {...formItemLayout}>
          {getFieldDecorator('status', {
            rules: [],
            valuePropName: 'checked',
            initialValue: true,
          })(<Switch checkedChildren={"启用"} unCheckedChildren={"禁用"}/>)}
        </Form.Item>
        <Form.Item>
          <Button type="primary"
                  block
                  htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );

};

export default Form.create()(MenuAddModal);
