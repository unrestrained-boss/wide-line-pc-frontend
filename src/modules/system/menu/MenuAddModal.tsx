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
import MenuService, {IMenu} from "../../../services/system/MenuService";
import ClrErrorTip from "../../../components/clr-error-tip/ClrErrorTip";
import ClrSpinner from "../../../components/clr-spinner/ClrSpinner";
import ClrSelect from "../../../components/clr-select/ClrSelect";
import ClrTreeSelect from "../../../components/clr-tree-select/ClrTreeSelect";


interface Props extends IModalInjectProps {
}

const MenuAddModal: React.FC<Props> = (props) => {
  const preData = props.getPreData<IMenu>();
  const isEditMode = preData !== undefined;
  const labelWith = '100px';
  const disabledValues: any[] = [];
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
    url: Yup.string()
      .required('地址必填'),
  };
  if (isEditMode) {
    disabledValues.push(preData.id);
    initialValues = {...initialValues, ...preData};
  }
  const validationSchema = Yup.object().shape(validationRule);

  function handleSubmit(values: IMenu, {setSubmitting}: any) {
    props.setBackgroundDismiss(false);
    props.setShowClose(false);
    setSubmitting(true);
    const body = {
      name: values.name,
      icon: values.icon,
      as: values.as,
      url: values.url,
      pid: values.pid,
      sort: values.sort,
      status: values.status,
    };
    if (isEditMode) {
      handleEditSubmit(body, setSubmitting);
    } else {
      handleAddSubmit(body, setSubmitting);
    }
  }

  async function handleAddSubmit(values: IMenu, setSubmitting: any) {
    // @ts-ignore
    const [, err] = await MenuService.addMenu(values);
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
    // @ts-ignore
    const [, err] = await MenuService.updateMenu(preData.id, values);
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

  const {data, isLoading, isError, refresh} = MenuService.useMenuUrlList();
  const {data: menuData, isLoading: isMenuLoading, isError: isMenuError, refresh: menuRefresh} = MenuService.useMenuList();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}>
      {({isSubmitting}) => {
        return <ClrForm>
          <div style={{textAlign: 'center', marginBottom: '10px'}}>
            <ClrErrorTip size={"small"} show={isError || isMenuError} onClick={() => {
              refresh();
              menuRefresh();
            }}/>
            <ClrSpinner size={"small"} spinner={isLoading || isMenuLoading}/>
          </div>
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

          <ClrFormItem labelWidth={labelWith}
                       label="地址"
                       name="url">
            <ClrSelect placeholder={"请选择地址"} data={data} labelProp={"uri"} valueProp={"uri"}/>
          </ClrFormItem>

          <ClrFormItem labelWidth={labelWith}
                       label="上级菜单"
                       name="pid">
            <ClrTreeSelect rootNode={{title: '根', value: 0}} disabledValues={disabledValues} treeData={menuData} labelProp={"name"} valueProp={"id"}/>
          </ClrFormItem>

          <ClrFormItem labelWidth={labelWith}
                       label="状态"
                       name="status">
            <ClrSwitch activeValue={1} inactiveValue={0}/>
          </ClrFormItem>

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
