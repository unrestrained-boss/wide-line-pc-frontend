import React from "react";
import './LoginPage.scss'
import {ErrorMessage, Field, Form, Formik} from "formik";
import ClrInput from "../components/clr-input/ClrInput";
import * as Yup from "yup";
import ClrButton from "../components/clr-button/ClrButton";
import {history} from "../utils/utils";

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
  return (
    <div className="login-wrapper">
      <ClrInput value={"hf"} placeholder="请输入用户名" type="text"/>
      <Formik initialValues={{username: '', password: ''}}
              onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                  setSubmitting(false);
                  history.push('/');
                }, 1000)
              }}
              validationSchema={validationSchema}>
        {({isSubmitting}) => {
          return <Form className="clr-form">
            <div className="clr-form-item">
              <label htmlFor="username">用户名</label>
              <Field name="username"
                     render={({field}: any) => <ClrInput {...field} placeholder="请输入用户名" type="text"/>}/>
              <ErrorMessage name="username" component="div" className="clr-validate-field"/>
            </div>
            <div className="clr-form-item">
              <label htmlFor="password">密码</label>
              <Field name="password"
                     render={({field}: any) => <ClrInput {...field} placeholder="请输入密码" type="password"/>}/>
              <ErrorMessage name="password" component="div" className="clr-validate-field"/>
            </div>
            <div className="clr-form-item">
              <ClrButton type="primary" disabled={isSubmitting}>
                立即登录
              </ClrButton>
            </div>
          </Form>
        }}

      </Formik>

    </div>
  );
};

