import React, {useState} from 'react';
import {Alert, Button, Form, Input, message, Spin} from "antd";
import {FormComponentProps} from "antd/lib/form";
import WLModal, {IWLModalInjectProps} from "../../components/wl-modal/WLModal";
import UserService from "../../services/UserService";

interface IProps extends FormComponentProps<{
  originPsw: string;
  password: string;
  repassword: string;
}>, IWLModalInjectProps {

}
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};
const ChangePasswordModal: React.FC<IProps> = (props) => {
  const {getFieldDecorator, validateFieldsAndScroll} = props.form;
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    validateFieldsAndScroll((error, values) => {
      if (error) {
        return;
      }
      if (values.password !== values.repassword) {
        message.warn("两次密码输入不一致");
        return;
      }
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        props.close();
        // 发送请求 修改密码
        WLModal.alert('修改成功, 点击确定进行重新登录', {
          defaultClosable: false,
          onOk() {
            UserService.logoutUser();
            window.location.href = process.env.REACT_APP_BASE_URL as string;
          }
        });
      }, 1000);
    });
  }

  return (
    <Spin spinning={submitting}>
      <Alert style={{marginBottom: '20px'}} message="注意: 修改成功后, 可能需要重新登录" closable type="warning" />

      <Form layout={"horizontal"} onSubmit={e => handleSubmit(e)}>
        <Form.Item label={"原密码"} {...formItemLayout}>
          {getFieldDecorator('originPsw', {
            rules: [{required: true, message: '请输入原密码'}],
          })(<Input autoFocus type={"password"} placeholder={"请输入原密码"}/>)}
        </Form.Item>
        <Form.Item label={"新密码"} {...formItemLayout}>
          {getFieldDecorator('password', {
            rules: [{required: true, message: '请输入新密码'}],
          })(<Input type={"password"} placeholder={"请输入新密码"}/>)}
        </Form.Item>
        <Form.Item label={"确认密码"} {...formItemLayout}>
          {getFieldDecorator('repassword', {
            rules: [{required: true, message: '请输入确认密码'}],
          })(<Input type={"password"} placeholder={"请输入确认密码"}/>)}
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

export default Form.create()(ChangePasswordModal);
