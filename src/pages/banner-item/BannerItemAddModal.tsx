import React, {useEffect, useState} from "react";
import {Button, Form, Input, Switch, Spin, message, Upload, Icon} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {IWLModalInjectProps} from "../../components/wl-modal/WLModal";
// import BannerService from "../../../services/system/BannerService";
import {
  uploadCustomRequest,
  uploadGetValueFromEvent,
  uploadPreData,
  uploadResultSerialization
} from "../../utils/Upload";
import UserService from "../../services/UserService";
import BannerItemService, {IBannerItem} from "../../services/BannerItemService";

interface Props extends FormComponentProps<IBannerItem & { img: any[] }>, IWLModalInjectProps {
}

const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};
const BannerItemAddModal: React.FC<Props> = (props) => {
  const preData = props.getPreData<IBannerItem>();
  const isEditMode = preData !== undefined;
  const [submitting, setSubmitting] = useState(false);
  const {getFieldDecorator, validateFieldsAndScroll, setFieldsValue, getFieldValue} = props.form;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    validateFieldsAndScroll((error, values) => {
      if (error) {
        return;
      }
      handleDoSubmit(values);
    });
  }

  function handleDoSubmit(values: IBannerItem & { img: any[] }) {
    props.setCanClosable(false);
    setSubmitting(true);
    const files = uploadResultSerialization(values.img, process.env.REACT_APP_API_BASE_URL);
    const body: IBannerItem = {
      img: files.length > 0 ? files[0] : null,
      value: values.value,
      type: values.type,
      status: values.status ? 1 : 0,
      pid: 1,
    };
    if (isEditMode) {
      handleEditSubmit(body);
    } else {
      handleAddSubmit(body);
    }
  }

  async function handleAddSubmit(values: IBannerItem) {
    const [, err] = await BannerItemService.addBannerItem(values);
    props.setCanClosable(true);
    setSubmitting(false);
    if (err) {
      err.showMessage();
      return;
    }
    props.close();
    props.onComplete!();
    message.success('添加成功!');
  }

  async function handleEditSubmit(values: IBannerItem) {
    const [, err] = await BannerItemService.updateBannerItem(preData.id!, values);
    props.setCanClosable(true);
    setSubmitting(false);
    if (err) {
      err.showMessage();
      return;
    }
    props.close();
    props.onComplete!();
    message.success('编辑成功!');
  }

  useEffect(() => {
    if (isEditMode) {
      setFieldsValue({
        img: preData.img ? uploadPreData([preData.img]) : [],
        type: preData.type,
        value: preData.value,
        status: preData.status === 1,
      });
    }
    // eslint-disable-next-line
  }, []);
  const img = getFieldValue('img') || [];
  return (
    <Spin spinning={submitting}>

      <Form layout={"horizontal"} onSubmit={e => handleSubmit(e)}>
        <Form.Item label={"banner"} {...formItemLayout} extra="上传 jpg/png 文件">
          {getFieldDecorator('img', {
            rules: [
              {required: true, message: '请上传图片'},
              // {validator: (rule, value: any[], cb) => {
              //     if(value.length === 0) {
              //       cb(new Error('请上传图片'));
              //     }
              //     cb();
              //   }},
              {
                validator: (rule, value: any[], cb) => {
                  for (let item of value) {
                    if (item.status === 'error') {
                      cb(new Error('图片上传失败, 请重试'));
                    }
                  }
                  cb();
                }
              },
            ],
            initialValue: [],
            valuePropName: 'fileList',
            getValueFromEvent: uploadGetValueFromEvent,
          })(<Upload
            data={{type: 'user'}}
            headers={{'X-Token': UserService.getUserToken()!}}
            customRequest={uploadCustomRequest}
            action={`${process.env.REACT_APP_API_BASE_URL}/upload/files`}
            listType="picture-card">
            {img.length === 0 && (
              <>
                <Icon type="plus"/>
                <div className="ant-upload-text">选择文件</div>
              </>
            )}
          </Upload>)}
        </Form.Item>
        <Form.Item label={"参数"} {...formItemLayout}>
          {getFieldDecorator('value', {
            rules: [{required: true, message: '请输入参数'}],
          })(<Input autoFocus placeholder={"请输入参数"}/>)}
        </Form.Item>
        <Form.Item label={"类型"} {...formItemLayout}>
          {getFieldDecorator('type', {
            rules: [{required: true, message: '请输入类型'}],
          })(<Input placeholder={"请输入类型"}/>)}
        </Form.Item>
        <Form.Item label={"状态"} {...formItemLayout}>
          {getFieldDecorator('status', {
            rules: [],
            valuePropName: 'checked',
            initialValue: true,
          })(<Switch checkedChildren={"启用"} unCheckedChildren={"禁用"}/>)}
        </Form.Item>
        <Form.Item>
          <Button type="primary"
                  block
                  htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );

};

export default Form.create()(BannerItemAddModal);
