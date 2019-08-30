import React, {useEffect, useMemo, useState} from "react";
import {Button, Form, Input, Switch, Spin, message, TreeSelect, Alert} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {IWLModalInjectProps} from "../../components/wl-modal/WLModal";
import RoleService, {IRole} from "../../services/RoleService";
import TextArea from "antd/lib/input/TextArea";
import MenuService from "../../services/MenuService";
import Tool from "../../utils/Tool";

interface Props extends FormComponentProps<IRole>, IWLModalInjectProps {
}

const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};
const RoleAddModal: React.FC<Props> = (props) => {
  const preData = props.getPreData<IRole>();
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

  function handleDoSubmit(values: IRole) {
    props.setCanClosable(false);
    setSubmitting(true);
    const body: IRole = {
      name: values.name,
      desc: values.desc,
      status: values.status ? 1 : 0,
      role_router: (values.role_router as any[]).join(','),
    };
    if (isEditMode) {
      handleEditSubmit(body);
    } else {
      handleAddSubmit(body);
    }
  }

  async function handleAddSubmit(values: IRole) {
    const [, err] = await RoleService.addRole(values);
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

  async function handleEditSubmit(values: IRole) {
    const [, err] = await RoleService.updateRole(preData.id!, values);
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
        desc: preData.desc,
        role_router: (preData.role_router as string).split(','),
        status: preData.status === 1,
      });
    }
    // eslint-disable-next-line
  }, []);
  const {data: menuData, isLoading: menuIsLoading, isError: menuIsError, refresh: menuRefresh} = MenuService.useMenuList();
  const treeData = useMemo(() => {
    return Tool.transformTitleAndValue(menuData, [], 'name', 'id');
  }, [menuData]);
  return (
    <Spin spinning={submitting || menuIsLoading}>
      {menuIsError && (
        <Alert style={{marginTop: '20px'}}
               showIcon
               message={"抱歉"}
               description={(
                 <>
                   <span>出现了一点问题, 请稍后再试或</span>
                   <Button type={"link"} onClick={() => menuRefresh()}>点击重试</Button>
                 </>
               )}
               type="error"
               closable
        />
      )}
      <Form layout={"horizontal"} onSubmit={e => handleSubmit(e)}>
        <Form.Item label={"角色名称"} {...formItemLayout}>
          {getFieldDecorator('name', {
            rules: [{required: true, message: '请输入角色名称'}],
          })(<Input autoFocus placeholder={"请输入角色名称"}/>)}
        </Form.Item>
        <Form.Item label={"角色描述"} {...formItemLayout}>
          {getFieldDecorator('desc', {
            rules: [{required: true, message: '请输入角色描述'}],
          })(<TextArea autosize={{minRows: 4, maxRows: 6}} placeholder={"请输入角色描述"}/>)}
        </Form.Item>
        <Form.Item label={"菜单权限"} {...formItemLayout}>
          {getFieldDecorator('role_router', {
            rules: [{required: true, message: '请选择菜单权限'}],
          })(<TreeSelect treeData={treeData}
                         treeCheckable
                         treeDefaultExpandAll
                         showCheckedStrategy={"SHOW_ALL"}
                         placeholder={"请选择菜单权限"}/>)}
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

export default Form.create()(RoleAddModal);
