import React from "react";
import './LoginPage.scss'
import {Formik} from "formik";
import ClrInput from "../components/clr-input/ClrInput";
import * as Yup from "yup";
import ClrButton from "../components/clr-button/ClrButton";
import {history} from "../utils/Constant";
import ClrFormItem from "../components/clr-form-item/ClrFormItem";
import ClrForm from "../components/clr-form/ClrForm";
import UserService from "../services/UserService";
import ClrMessageService from "../components/clr-message/ClrMessageService";

export const LoginPage: React.FC = () => {
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, '用户名至少 4 位')
      .max(16, '用户名最多 16 位')
      .required('用户名必填'),
    password: Yup.string()
      .min(4, '密码至少 4 位')
      .max(16, '密码最多 16 位')
      .required('密码必填'),
  });
  async function handleSubmit(values: any, {setSubmitting}: any) {
    await UserService.loginUser(values);
    setSubmitting(false);
    history.push('/');
    ClrMessageService.success('登录成功!');
  }
  return (
    <div className="login-wrapper">
      <Formik initialValues={{username: '', password: ''}}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}>
        {({isSubmitting}) => {
          return <ClrForm>
            <ClrFormItem label="用户名"
                         name="username">
              <ClrInput placeholder="请输入用户名" type="text"/>
            </ClrFormItem>
            <ClrFormItem label="密码"
                         name="password">
              <ClrInput placeholder="请输入密码" type="password"/>
            </ClrFormItem>
            <ClrFormItem>
              <ClrButton nativeType={"submit"} type="primary" disabled={isSubmitting}>
                立即登录
              </ClrButton>
            </ClrFormItem>
          </ClrForm>
        }}

      </Formik>

    </div>
  );
};

