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
import RoleService from "../../../services/system/RoleService";
// import ClrTreeSelect from "../../../components/clr-tree-select/ClrTreeSelect";
import {IMenu} from "../../../services/system/MenuService";


interface Props extends IModalInjectProps {
}

const MenuAddModal: React.FC<Props> = (props) => {
  const preData = props.getPreData<IMenu>();
  const isEditMode = preData !== undefined;
  const labelWith = '100px';
  let initialValues: IMenu = {
    name: '',
    icon: '',
    as: '',
    url: '',
    sort: 1,
    status: 1,
  };
  const validationRule = {
    name: Yup.string()
      .min(2, '名称至少 2 位')
      .max(32, '名称最多 32 位')
      .required('名称必填'),
    // desc: Yup.string()
    //   .min(2, '描述至少 2 位')
    //   .max(32, '描述最多 32 位')
    //   .required('描述必填'),
  };
  if (isEditMode) {
    initialValues = {...initialValues, ...preData};
    console.log(initialValues)
  }
  const validationSchema = Yup.object().shape(validationRule);

  function handleSubmit(values: IMenu, {setSubmitting}: any) {
    props.setBackgroundDismiss(false);
    props.setShowClose(false);
    setSubmitting(true);
    if (isEditMode) {
      handleEditSubmit(values, setSubmitting);
    } else {
      handleAddSubmit(values, setSubmitting);
    }
  }

  async function handleAddSubmit(values: IMenu, setSubmitting: any) {
    const body = {
      name: values.name,
      icon: values.icon,
      as: values.as,
      url: values.url,
      sort: values.sort,
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

  async function handleEditSubmit(values: IMenu, setSubmitting: any) {
    const body = {
      name: values.name,
      icon: values.icon,
      as: values.as,
      url: values.url,
      sort: values.sort,
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
                       label="icon"
                       name="icon">
            <ClrInput
              type="text"/>
          </ClrFormItem>
          <ClrFormItem labelWidth={labelWith}
                       label="别名"
                       name="as">
            <ClrInput
              type="text"/>
          </ClrFormItem>

          {/*<ClrFormItem labelWidth={labelWith}*/}
          {/*             label="地址"*/}
          {/*             name="url">*/}
          {/*  <ClrTreeSelect/>*/}
          {/*</ClrFormItem>*/}

          {/*<ClrFormItem labelWidth={labelWith}*/}
          {/*             label="上级菜单"*/}
          {/*             name="sort">*/}
          {/*  <ClrTreeSelect/>*/}
          {/*</ClrFormItem>*/}

          <ClrFormItem labelWidth={labelWith}
                       label="状态"
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

export default MenuAddModal;
