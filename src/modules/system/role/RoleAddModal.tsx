import {IModalInjectProps} from "../../../components/clr-modal/ClrModal";
import * as Yup from "yup";
import ClrForm from "../../../components/clr-form/ClrForm";
import ClrFormItem from "../../../components/clr-form-item/ClrFormItem";
import ClrInput from "../../../components/clr-input/ClrInput";
import ClrSwitch from "../../../components/clr-switch/ClrSwitch";
import ClrButton from "../../../components/clr-button/ClrButton";
import {Formik} from "formik";
import React from "react";
import ClrMessageService from "../../../components/clr-message/ClrMessageService";
import RoleService, {IRole} from "../../../services/system/RoleService";
import ClrTreeSelect from "../../../components/clr-tree-select/ClrTreeSelect";


interface Props extends IModalInjectProps {
}

const RoleAddModal: React.FC<Props> = (props) => {
  const preData = props.getPreData<IRole>();
  const isEditMode = preData !== undefined;
  const labelWith = '100px';
  let initialValues: IRole = {
    name: '',
    desc: '',
    role_menus: [],
    status: 1,
  };
  const validationRule = {
    name: Yup.string()
      .min(2, '名称至少 2 位')
      .max(32, '名称最多 32 位')
      .required('名称必填'),
    desc: Yup.string()
      .min(2, '描述至少 2 位')
      .max(32, '描述最多 32 位')
      .required('描述必填'),
  };
  if (isEditMode) {
    initialValues = {...initialValues, ...preData};
    // @ts-ignore
    initialValues.role_menus = preData.role_router.split(',')
    console.log(initialValues)
  }
  const validationSchema = Yup.object().shape(validationRule);

  function handleSubmit(values: IRole, {setSubmitting}: any) {
    props.setBackgroundDismiss(false);
    props.setShowClose(false);
    setSubmitting(true);
    if (isEditMode) {
      handleEditSubmit(values, setSubmitting);
    } else {
      handleAddSubmit(values, setSubmitting);
    }
  }

  async function handleAddSubmit(values: IRole, setSubmitting: any) {
    const body = {
      name: values.name,
      desc: values.desc,
      role_menus: values.role_menus.join(','),
      status: values.status,
    };
    // @ts-ignore
    const [, err] = await RoleService.addRole(body);
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

  async function handleEditSubmit(values: IRole, setSubmitting: any) {
    const body = {
      name: values.name,
      desc: values.desc,
      status: values.status,
    };
    // @ts-ignore
    const [, err] = await RoleService.updateRole(preData.id, body);
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
                       label="名称"
                       name="name">
            <ClrInput
              type="text"/>
          </ClrFormItem>
          <ClrFormItem labelWidth={labelWith}
                       label="描述"
                       name="desc">
            <ClrInput
              type="text"/>
          </ClrFormItem>
          <ClrFormItem labelWidth={labelWith}
                       label="菜单权限"
                       name="role_menus">
            <ClrTreeSelect/>
          </ClrFormItem>

          <ClrFormItem labelWidth={labelWith}
                       label="是否启用"
                       name="status">
            <ClrSwitch activeValue={1} inactiveValue={0}/>
          </ClrFormItem >

          <ClrFormItem labelWidth={labelWith}>
            <ClrButton nativeType="submit" type="primary" disabled={isSubmitting}>
              立即{isEditMode ? '修改' : '添加'}
            </ClrButton>
          </ClrFormItem>
        </ClrForm>
      }}

    </Formik>
  );

};

export default RoleAddModal;
