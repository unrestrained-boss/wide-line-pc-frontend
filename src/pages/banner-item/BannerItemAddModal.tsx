import React, {useEffect, useState} from "react";
import {Button, Form, Input, Switch, Spin, message, Upload, Icon, Select, Alert} from "antd";
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
import BannerService from "../../services/BannerService";

interface Props extends FormComponentProps<IBannerItem & { img: any[] }>, IWLModalInjectProps {
}

const formItemLayout = {
  labelCol: {span: 5},
  wrapperCol: {span: 19},
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
      pid: values.pid,
    };
    if (isEditMode) {
      handleEditSubmit(body);
    } else {
      handleAddSubmit(body);
    }
  }

  async function handleAddSubmit(values: IBannerItem) {
    const [, err] = await BannerItemService.add(values);
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
    const [, err] = await BannerItemService.update(preData.id!, values);
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
        pid: preData.pid,
      });
    }
    // eslint-disable-next-line
  }, []);
  const img = getFieldValue('img') || [];
  const {data: bannerData, isLoading: bannerIsLoading, isError: bannerIsError, refresh: bannerRefresh} = BannerService.useList();

  return (
    <Spin spinning={submitting || bannerIsLoading}>
      {bannerIsError && (
        <Alert style={{marginTop: '20px'}}
               showIcon
               message={"抱歉"}
               description={(
                 <>
                   <span>出现了一点问题, 请稍后再试或</span>
                   <Button type={"link"} onClick={() => bannerRefresh()}>点击重试</Button>
                 </>
               )}
               type="error"
               closable
        />
      )}
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
        <Form.Item label={"banner分类"} {...formItemLayout}>
          {getFieldDecorator('pid', {
            rules: [{required: true, message: '请选择banner分类'}],
          })(<Select autoFocus placeholder={"请选择banner分类"}>
            {bannerData.map(item => {
              return (
                <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
              );
            })}
          </Select>)}
        </Form.Item>
        <Form.Item label={"参数"} {...formItemLayout}>
          {getFieldDecorator('value', {
            rules: [{required: true, message: '请输入参数'}],
          })(<Input placeholder={"请输入参数"}/>)}
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
