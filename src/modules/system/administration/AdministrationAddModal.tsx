import {IModalInjectProps} from "../../../components/clr-modal/ClrModal";
import * as Yup from "yup";
import ClrForm from "../../../components/clr-form/ClrForm";
import ClrFormItem from "../../../components/clr-form-item/ClrFormItem";
import ClrUpload from "../../../components/clr-upload/ClrUpload";
import ClrInput from "../../../components/clr-input/ClrInput";
import ClrSwitch from "../../../components/clr-switch/ClrSwitch";
import ClrButton from "../../../components/clr-button/ClrButton";
import {Formik} from "formik";
import React from "react";
import AdministrationService, {IAdministration} from "../../../services/system/AdministrationService";

interface Props extends IModalInjectProps {
}

const AdministrationAddModal: React.FC<Props> = (props) => {

  const labelWith = '100px';
  let initialValues: IAdministration = {
    username: '',
    nickname: '',
    avatar: '',
    mobile: '',
    status: 1,
  };
  const validationSchema = Yup.object().shape({
    avatar: Yup.array()
      .min(1, '头像 需要 1 张')
      .required('头像必传'),
    username: Yup.string()
      .min(4, '用户名至少 4 位')
      .max(32, '用户名最多 32 位')
      .required('用户名必填'),
    nickname: Yup.string()
      .min(2, '昵称至少 2 位')
      .max(32, '昵称最多 32 位')
      .required('昵称必填'),
    mobile: Yup.string()
      .length(11, '联系电话需要 11 位')
      // .test('phone', '联系电话格式不正确', value => {
      //   return value === '11111111111';
      // })
      .required('联系电话必填'),
    password: Yup.string()
      .min(4, '密码至少 4 位')
      .max(32, '密码最多 32 位')
      .required('密码必填'),
    repassword: Yup.string()
      .min(4, '确认密码至少 4 位')
      .max(32, '确认密码最多 32 位')
      .required('确认密码必填'),

  });

  async function handleSubmit(values: IAdministration & {password: string, repassword: string}, {setSubmitting}: any) {
    const body = {
      username: values.username,
      nickname: values.nickname,
      avatar: values.avatar![0],
      mobile: values.mobile,
      status: values.status,
      password: values.password,
      repassword: values.repassword,
    };
    props.setBackgroundDismiss(false);
    props.setShowClose(false);
    setSubmitting(true);
    // @ts-ignore
    const [, err] = await AdministrationService.addAdministration(body);
    props.setBackgroundDismiss(true);
    props.setShowClose(true);
    setSubmitting(false);
    if (err) {
      err.showMessage();
      return;
    }
    props.close();
  }

  return (
    <Formik
      initialValues={{...initialValues, password: '', repassword: ''}}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}>
      {({isSubmitting}) => {
        return <ClrForm>
          <ClrFormItem labelWidth={labelWith}
                       label="头像"
                       name="avatar">
            <ClrUpload limit={1} action={"https://jsonplaceholder.typicode.com/posts/"}/>
          </ClrFormItem>
          <ClrFormItem labelWidth={labelWith}
                       label="用户名"
                       name="username">
            <ClrInput placeholder="请输入用户名"
                      type="text"/>
          </ClrFormItem>
          <ClrFormItem labelWidth={labelWith}
                       label="昵称"
                       name="nickname">
            <ClrInput placeholder="请输入昵称"
                      type="text"/>
          </ClrFormItem>
          <ClrFormItem labelWidth={labelWith}
                       label="电话"
                       name="mobile">
            <ClrInput placeholder="请输入电话"
                      type="text"/>
          </ClrFormItem>
          <ClrFormItem labelWidth={labelWith}
                       label="密码"
                       name="password">
            <ClrInput placeholder="请输入密码"
                      type="password"/>
          </ClrFormItem>
          <ClrFormItem labelWidth={labelWith}
                       label="确认密码"
                       name="repassword">
            <ClrInput placeholder="请输入确认密码"
                      type="password"/>
          </ClrFormItem>
          <ClrFormItem labelWidth={labelWith}
                       label="是否启用"
                       name="status">
            <ClrSwitch activeValue={1} inactiveValue={2}/>
          </ClrFormItem>

          {/*<ClrFormItem labelWidth={labelWith}*/}
          {/*             label="排序"*/}
          {/*             name="sort">*/}
          {/*  <ClrInput placeholder="请输入排序"*/}
          {/*            type="text"/>*/}
          {/*</ClrFormItem>*/}

          <ClrFormItem labelWidth={labelWith}>
            <ClrButton nativeType="submit" type="primary" disabled={isSubmitting}>
              {/*立即{isEditMode? '修改': '添加'}*/}
              xxx
            </ClrButton>
          </ClrFormItem>
        </ClrForm>
      }}

    </Formik>
  );

};

export default AdministrationAddModal;
