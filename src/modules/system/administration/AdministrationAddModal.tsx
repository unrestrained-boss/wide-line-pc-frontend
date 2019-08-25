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
import ClrMessageService from "../../../components/clr-message/ClrMessageService";

interface Props extends IModalInjectProps {
}

const AdministrationAddModal: React.FC<Props> = (props) => {
  const preData = props.getPreData<IAdministration>();
  const isEditMode = preData !== undefined;
  const labelWith = '100px';
  let initialValues: IAdministration & { password?: string, repassword?: string } = {
    username: '',
    nickname: '',
    avatar: '',
    email: '',
    mobile: '',
    status: 1,
  };
  const validationRule = {
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
    email: Yup.string()
      .email('邮箱格式错误')
      .required('邮箱必填'),
    mobile: Yup.string()
      .length(11, '联系电话需要 11 位')
      .required('联系电话必填'),
    password: Yup.string()
      .min(4, '密码至少 4 位')
      .max(32, '密码最多 32 位')
      .required('密码必填'),
    repassword: Yup.string()
      .min(4, '确认密码至少 4 位')
      .max(32, '确认密码最多 32 位')
      .oneOf([Yup.ref('password'), null], '两次密码输入不一致')
      .required('确认密码必填'),

  };

  if (isEditMode) {
    let avatar = preData.avatar as string;
    avatar = '/uploads/' + avatar.split('/uploads/')[1];
    initialValues = {...initialValues, ...preData, avatar: [avatar]};
    delete validationRule.password;
    delete validationRule.repassword;
  } else {
    initialValues.password = '';
    initialValues.repassword = '';
  }
  const validationSchema = Yup.object().shape(validationRule);
   function handleSubmit(values: IAdministration & { password?: string, repassword?: string }, {setSubmitting}: any) {
     props.setBackgroundDismiss(false);
     props.setShowClose(false);
     setSubmitting(true);
    if (isEditMode) {
      handleEditSubmit(values, setSubmitting);
    } else {
      handleAddSubmit(values, setSubmitting);
    }
  }
  async function handleAddSubmit(values: IAdministration & { password?: string, repassword?: string }, setSubmitting: any) {
    const body = {
      username: values.username,
      nickname: values.nickname,
      email: values.email,
      avatar: values.avatar![0],
      mobile: values.mobile,
      status: values.status,
      password: values.password!,
      repassword: values.repassword!,
    };
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
    props.onComplete && props.onComplete();
    ClrMessageService.success('添加成功!');
  }
  async function handleEditSubmit(values: IAdministration & { password?: string, repassword?: string }, setSubmitting: any) {
    const body = {
      username: values.username,
      nickname: values.nickname,
      email: values.email,
      avatar: values.avatar![0],
      mobile: values.mobile,
      status: values.status,
    };
    // @ts-ignore
    const [, err] = await AdministrationService.updateAdministration(preData.id, body);
    props.setBackgroundDismiss(true);
    props.setShowClose(true);
    setSubmitting(false);
    if (err) {
      err.showMessage();
      return;
    }
    props.close();
    props.onComplete && props.onComplete();
    ClrMessageService.success('编辑成功!');
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}>
      {({isSubmitting}) => {
        return <ClrForm>
          <ClrFormItem labelWidth={labelWith}
                       label="头像"
                       name="avatar">
            <ClrUpload limit={1}
                       key={"file"}
                       data={{type: 'user'}}
                       checkResponse={(value, done, error) => {
                         if (typeof value === 'string') {
                           error();
                           return;
                         }
                         if (value.code !== 200) {
                           error();
                           return;
                         }
                         done(value.data[0]);
                       }}
                       urlPrefix={process.env.REACT_APP_API_BASE_URL}
                       action={process.env.REACT_APP_API_BASE_URL + "/upload/files"}/>
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
                       label="邮箱"
                       name="email">
            <ClrInput placeholder="请输入邮箱"
                      type="email"/>
          </ClrFormItem>
          <ClrFormItem labelWidth={labelWith}
                       label="电话"
                       name="mobile">
            <ClrInput placeholder="请输入电话"
                      type="text"/>
          </ClrFormItem>
          {!isEditMode && (
            <>
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
            </>
          )}
          <ClrFormItem labelWidth={labelWith}
                       label="是否启用"
                       name="status">
            <ClrSwitch activeValue={1} inactiveValue={0}/>
          </ClrFormItem>

          <ClrFormItem labelWidth={labelWith}>
            <ClrButton nativeType="submit" type="primary" disabled={isSubmitting}>
              立即{isEditMode? '修改': '添加'}
            </ClrButton>
          </ClrFormItem>
        </ClrForm>
      }}

    </Formik>
  );

};

export default AdministrationAddModal;
