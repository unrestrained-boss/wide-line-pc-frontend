import React, {PureComponent} from 'react';
import './BannerAddModal.scss'
import {IBanner} from "../../../services/system/BannerService";
import {Field, Formik} from "formik";
import ClrInput from "../../../components/clr-input/ClrInput";
import ClrButton from "../../../components/clr-button/ClrButton";
import * as Yup from 'yup';
import ClrFormItem from "../../../components/clr-form-item/ClrFormItem";
import ClrForm from "../../../components/clr-form/ClrForm";
import ClrCheckbox from "../../../components/clr-checkbox/ClrCheckbox";
import ClrCheckboxGroup from "../../../components/clr-checkbox/ClrCheckboxGroup";

interface OwnProps {
  data: IBanner;
  close: () => void;
}

type Props = OwnProps;

type State = Readonly<{}>;

class BannerAddModal extends PureComponent<Props, State> {
  readonly state: State = {};
  testSchema = Yup.object().shape({
    // banner: Yup.array().min(2, '请选择两张banner'),
    username: Yup.string()
      .min(2, '用户名至少 2 位')
      .max(8, '用户名最多 8 位')
      .required('用户名必填'),
    password: Yup.string()
      .min(2, '密码至少 2 位')
      .max(8, '密码最多 8 位')
      .required('密码必填'),

  });
  labelWith = '100px';

  render() {
    return (
      <div className="banner-add-modal">
        <Formik initialValues={{banner: [], username: '', password: '', isSuperMan: ["a", "b", "c"]}}
                onSubmit={(values, {setSubmitting}) => {
                  setTimeout(() => {
                    setSubmitting(false);
                    console.log(values);
                  }, 1000)
                }}
                validationSchema={this.testSchema}>
          {({isSubmitting}) => {
            return <ClrForm>
              {/*<ClrFormItem name="banner" label="banner图片" labelWidth={this.labelWith}>*/}
              {/*  <Field name="banner"*/}
              {/*         render={({field}: any) => <ClrUpload {...field} headers={{a: 'xxx'}}*/}
              {/*                                              limit={2} action="https://jsonplaceholder.typicode.com/posts/"/>}/>*/}

              {/*</ClrFormItem>*/}
              <ClrFormItem labelWidth={this.labelWith} label="用户名" name="username">
                <Field name="username"
                       render={({field}: any) => <ClrInput {...field} placeholder="请输入用户名" type="text"/>}/>
              </ClrFormItem>
              <ClrFormItem labelWidth={this.labelWith} label="密码" name="password">
                <Field name="password"
                       render={({field}: any) => <ClrInput {...field} placeholder="请输入密码" type="password"/>}/>
              </ClrFormItem>
              <ClrFormItem labelWidth={this.labelWith} label="超级英雄" name="isSuperMan">
                <Field name="isSuperMan"
                       render={({field}: any) => {
                         return (
                           <ClrCheckboxGroup {...field}>
                             <ClrCheckbox value={"a"}>a</ClrCheckbox>
                             <ClrCheckbox value={"b"}>b</ClrCheckbox>
                             <ClrCheckbox value={"c"}>c</ClrCheckbox>
                             <ClrCheckbox value={"d"}>d</ClrCheckbox>
                           </ClrCheckboxGroup>
                         );
                       }}/>
              </ClrFormItem>
              <ClrFormItem labelWidth={this.labelWith}>
                <ClrButton nativeType="submit" type="primary" disabled={isSubmitting}>
                  立即登录
                </ClrButton>
              </ClrFormItem>
            </ClrForm>
          }}

        </Formik>
      </div>
    );
  }
}

export default BannerAddModal;
