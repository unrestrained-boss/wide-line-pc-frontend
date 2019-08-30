import React, {useState} from "react";
import './LoginPage.scss'
import UserService from "../services/UserService";
import {Button, Form, Input, message, Spin} from "antd";
import {FormComponentProps} from "antd/lib/form";
import './LoginPage.scss';

const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};

interface Props extends FormComponentProps<{ username: string, password: string }> {

}

const LoginPage: React.FC<Props> = (props) => {
  const {getFieldDecorator, validateFieldsAndScroll} = props.form;
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    validateFieldsAndScroll(async (error, values) => {
      if (error) {
        return;
      }
      setSubmitting(true);
      // @ts-ignore
      const [data, err] = await UserService.loginUser(values);
      setSubmitting(false);
      if (err) {
        err.showMessage();
        return;
      }
      UserService.setUserToken(data.token);

      message.success('登陆成功');
      setTimeout(() => {
        window.location.href = process.env.REACT_APP_BASE_URL as string;
      }, 1000);
    });
  }

  return (
    <div className="login-wrapper">
      <Spin spinning={submitting}>
        <Form className={"login-form"}
              layout={"horizontal"}
              onSubmit={e => handleSubmit(e)}>
          <h3 style={{textAlign: 'center'}}>登录</h3>
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
          <Button type={"link"}>忘记密码 ?</Button>
        </Form>
      </Spin>
    </div>
  );
};

export default Form.create()(LoginPage);
