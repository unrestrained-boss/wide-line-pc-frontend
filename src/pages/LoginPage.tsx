import React from "react";
import './LoginPage.scss'
import {history} from "../utils/Constant";
import UserService from "../services/UserService";
import {Button, Form, Input, message} from "antd";
import {FormComponentProps} from "antd/lib/form";
import './LoginPage.scss';

const formItemLayout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};

interface Props extends FormComponentProps<{ username: string, password: string }> {

}

const LoginPage: React.FC<Props> = (props) => {
  const {getFieldDecorator, validateFieldsAndScroll} = props.form;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    validateFieldsAndScroll(async (error, values) => {
      if (error) {
        return;
      }
      // @ts-ignore
      const [data, err] = await UserService.loginUser(values);
      if (err) {
        err.showMessage();
        return;
      }
      UserService.setUserToken(data.token);
      history.push('/');
      message.success('登陆成功');
    });
  }

  return (
    <div className="login-wrapper">
      <Form style={{backgroundColor: '#fff', padding: '20px'}} layout={"horizontal"} onSubmit={e => handleSubmit(e)}>
        <Form.Item label={"用户名"} {...formItemLayout}>
          {getFieldDecorator('username', {
            rules: [{required: true, message: '请输入用户名'}],
          })(<Input autoFocus placeholder={"请输入用户名"}/>)}
        </Form.Item>
        <Form.Item label={"密码"} {...formItemLayout}>
          {getFieldDecorator('password', {
            rules: [{required: true, message: '请输入密码'}],
          })(<Input type={"password"} placeholder={"请输入密码"}/>)}
        </Form.Item>
        <Form.Item>
          <Button type="primary"
                  block
                  htmlType="submit">
            立即登录
          </Button>
        </Form.Item>
      </Form>

    </div>
  );
};

export default  Form.create()(LoginPage);
