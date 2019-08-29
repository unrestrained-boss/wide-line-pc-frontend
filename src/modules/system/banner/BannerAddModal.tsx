import React, {useEffect, useState} from "react";
import {Button, Form, Input, Switch, Spin, message} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {IWLModalInjectProps} from "../../../components/wl-modal/WLModal";
import BannerService, {IBanner} from "../../../services/system/BannerService";

interface Props extends FormComponentProps<IBanner>, IWLModalInjectProps {
}

const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};
const BannerAddModal: React.FC<Props> = (props) => {
  const preData = props.getPreData<IBanner>();
  const isEditMode = preData !== undefined;
  const [submitting, setSubmitting] = useState(false);
  const {getFieldDecorator, validateFieldsAndScroll, setFieldsValue} = props.form;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    validateFieldsAndScroll((error, values) => {
      if (error) {
        return;
      }
      handleDoSubmit(values);
    });
  }

  function handleDoSubmit(values: IBanner) {
    props.setCanClosable(false);
    setSubmitting(true);
    const body: IBanner = {
      name: values.name,
      status: values.status ? 1 : 0,
    };
    if (isEditMode) {
      handleEditSubmit(body);
    } else {
      handleAddSubmit(body);
    }
  }

  async function handleAddSubmit(values: IBanner) {
    const [, err] = await BannerService.addBanner(values);
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

  async function handleEditSubmit(values: IBanner) {
    const [, err] = await BannerService.updateBanner(preData.id!, values);
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
        name: preData.name,
        status: preData.status === 1,
      });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Spin spinning={submitting}>

      <Form layout={"horizontal"} onSubmit={e => handleSubmit(e)}>
        <Form.Item label={"分类名称"} {...formItemLayout}>
          {getFieldDecorator('name', {
            rules: [{required: true, message: '请输入分类名称'}],
          })(<Input autoFocus placeholder={"请输入分类名称"}/>)}
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

export default Form.create()(BannerAddModal);
