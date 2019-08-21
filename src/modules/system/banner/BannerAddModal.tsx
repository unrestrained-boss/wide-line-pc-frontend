import React, {PureComponent} from 'react';
import './BannerAddModal.scss'
import {IBanner} from "../../../services/system/BannerService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import ClrInput from "../../../components/clr-input/ClrInput";
import ClrButton from "../../../components/clr-button/ClrButton";
import * as Yup from 'yup';
import ClrUpload from "../../../components/clr-upload/ClrUpload";

interface OwnProps {
  data: IBanner;
  close: () => void;
}

type Props = OwnProps;

type State = Readonly<{}>;

class BannerAddModal extends PureComponent<Props, State> {
  readonly state: State = {};
  testSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, '用户名至少 2 位')
      .max(8, '用户名最多 8 位')
      .required('用户名必填'),
    password: Yup.string()
      .min(2, '密码至少 2 位')
      .max(8, '密码最多 8 位')
      .required('密码必填'),

  });

  render() {
    return (
      <div className="banner-add-modal">
        <Formik initialValues={{username: '', password: ''}}
                onSubmit={(values, {setSubmitting}) => {
                  setTimeout(() => {
                    setSubmitting(false);
                    console.log(values);
                  }, 1000)
                }}
                validationSchema={this.testSchema}>
          {({isSubmitting}) => {
            return <Form className="clr-form">
              <div className="clr-form-item">
               <ClrUpload maximum={1}/>
              </div>
              <div className="clr-form-item">
                <Field name="username" render={({field}: any) => <ClrInput {...field} placeholder="请输入用户名" type="text"/>}/>
                <ErrorMessage name="username" component="div" className="clr-validate-field"/>
              </div>
              <div className="clr-form-item">
                <Field name="password" render={({field}: any) => <ClrInput {...field} placeholder="请输入密码" type="password"/>}/>
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
  }
}

export default BannerAddModal;
