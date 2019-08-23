import React from 'react';
import './BannerAddModal.scss'
import {IBanner} from "../../../services/system/BannerService";
import {Formik} from "formik";
import ClrInput from "../../../components/clr-input/ClrInput";
import ClrButton from "../../../components/clr-button/ClrButton";
import * as Yup from 'yup';
import ClrFormItem from "../../../components/clr-form-item/ClrFormItem";
import ClrForm from "../../../components/clr-form/ClrForm";
import ClrSwitch from "../../../components/clr-switch/ClrSwitch";
import ClrUpload from "../../../components/clr-upload/ClrUpload";

interface Props {
  data?: IBanner;
  close: () => void;
  setBackgroundDismiss: (s:boolean) => void;
  setShowClose: (s:boolean) => void;
}

const labelWith = '100px';
const initialValues: IBanner = {
  name: '',
  image: '',
  link: '',
  enable: true,
  sort: 1,
};
const validationSchema = Yup.object().shape({
  image: Yup.array()
    .min(1, 'banner 需要 1 张')
    .required('banner必传'),
  name: Yup.string()
    .min(2, '名称至少 2 位')
    .max(16, '名称最多 16 位')
    .required('名称必填'),
  link: Yup.string()
    .min(2, '链接至少 2 位')
    .max(128, '链接最多 16 位')
    .required('链接必填'),
  sort: Yup.string()
    .min(1, '排序至少 1 位')
    .required('排序必填'),

});
const BannerAddModal: React.FC<Props> = (props) => {

  const handleSubmit = (values: IBanner, {setSubmitting}: any) => {
    const body = {
      name: values.name,
      image: values.image[0],
      link: values.link,
      enable: values.enable,
      sort: values.sort,
    };
    props.setBackgroundDismiss(false);
    props.setShowClose(false);
    setTimeout(() => {
      setSubmitting(false);
      props.setBackgroundDismiss(true);
      props.setShowClose(true);
      props.close();
      console.log(body);
    }, 3000)
  };
  return (
    <div className="banner-add-modal">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        {({isSubmitting}) => {
          return <ClrForm>
            <ClrFormItem labelWidth={labelWith}
                         label="banner"
                         name="image">
              <ClrUpload limit={1} action={"https://jsonplaceholder.typicode.com/posts/"}/>
            </ClrFormItem>
            <ClrFormItem labelWidth={labelWith}
                         label="名称"
                         name="name">
              <ClrInput placeholder="请输入名称"
                        type="text"/>
            </ClrFormItem>
            <ClrFormItem labelWidth={labelWith}
                         label="链接"
                         name="link">
              <ClrInput placeholder="请输入链接"
                        type="text"/>
            </ClrFormItem>
            <ClrFormItem labelWidth={labelWith}
                         label="是否启用"
                         name="enable">
              <ClrSwitch/>
            </ClrFormItem>

            <ClrFormItem labelWidth={labelWith}
                         label="排序"
                         name="sort">
              <ClrInput placeholder="请输入排序"
                        type="text"/>
            </ClrFormItem>

            <ClrFormItem labelWidth={labelWith}>
              <ClrButton nativeType="submit" type="primary" disabled={isSubmitting}>
                立即添加
              </ClrButton>
            </ClrFormItem>
          </ClrForm>
        }}

      </Formik>
    </div>
  );
};

export default BannerAddModal;
