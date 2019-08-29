import React, {useEffect, useState} from "react";
import AdministrationService, {IAdministration} from "../../../services/system/AdministrationService";
import {Button, Form, Input, Switch, Spin, message, Upload, Icon} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {IWLModalInjectProps} from "../../../components/wl-modal/WLModal";
import UserService from "../../../services/UserService";
import {
  uploadCustomRequest,
  uploadGetValueFromEvent,
  uploadPreData,
  uploadResultSerialization
} from "../../../utils/Upload";

interface Props extends FormComponentProps<IAdministration & { avatar: any[] }>, IWLModalInjectProps {
}

const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};
const AdministrationAddModal: React.FC<Props> = (props) => {
  const preData = props.getPreData<IAdministration>();
  const isEditMode = preData !== undefined;
  const [submitting, setSubmitting] = useState(false);
  const {getFieldDecorator, validateFieldsAndScroll, getFieldValue, setFieldsValue} = props.form;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    validateFieldsAndScroll((error, values) => {
      if (error) {
        return;
      }
      handleDoSubmit(values);
    });
  }

  function handleDoSubmit(values: IAdministration & { password?: string, repassword?: string, avatar: any[] }) {
    props.setCanClosable(false);
    setSubmitting(true);
    const files = uploadResultSerialization(values.avatar, process.env.REACT_APP_API_BASE_URL);
    const body: IAdministration = {
      username: values.username,
      nickname: values.nickname,
      email: values.email,
      avatar: files.length > 0 ? files[0] : null,
      mobile: values.mobile,
      status: values.status ? 1 : 0,
    };
    if (isEditMode) {
      handleEditSubmit(body);
    } else {
      const addBody: IAdministration & { password: string, repassword: string } = {
        ...body,
        password: values.password!,
        repassword: values.repassword!,
      };
      handleAddSubmit(addBody);
    }
  }

  async function handleAddSubmit(values: IAdministration & { password: string, repassword: string }) {
    const [, err] = await AdministrationService.addAdministration(values);
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

  async function handleEditSubmit(values: IAdministration) {
    const [, err] = await AdministrationService.updateAdministration(preData.id!, values);
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
        avatar: preData.avatar ? uploadPreData([preData.avatar]) : [],
        username: preData.username,
        nickname: preData.nickname,
        mobile: preData.mobile,
        email: preData.email,
        status: preData.status === 1,
      });
    }
    // eslint-disable-next-line
  }, []);
  const avatar = getFieldValue('avatar') || [];
  return (
    <Spin spinning={submitting}>
      <Form layout={"horizontal"} onSubmit={e => handleSubmit(e)}>
        <Form.Item label={"头像"} {...formItemLayout} extra="上传 jpg/png 文件">
          {getFieldDecorator('avatar', {
            rules: [
              // {validator: (rule, value: any[], cb) => {
              //     if(value.length === 0) {
              //       cb(new Error('请上传头像'));
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
            {avatar.length === 0 && (
              <>
                <Icon type="plus"/>
                <div className="ant-upload-text">选择文件</div>
              </>
            )}
          </Upload>)}
        </Form.Item>
        <Form.Item label={"用户名"} {...formItemLayout}>
          {getFieldDecorator('username', {
            rules: [{required: true, message: '请输入用户名'}],
          })(<Input autoFocus placeholder={"请输入用户名"}/>)}
        </Form.Item>
        <Form.Item label={"昵称"} {...formItemLayout}>
          {getFieldDecorator('nickname', {
            rules: [{required: true, message: '请输入昵称'}],
          })(<Input placeholder={"请输入昵称"}/>)}
        </Form.Item>
        {!isEditMode && (
          <>
            <Form.Item label={"密码"} {...formItemLayout}>
              {getFieldDecorator('password', {
                rules: [{required: true, message: '请输入密码'}],
              })(<Input type={"password"} placeholder={"请输入密码"}/>)}
            </Form.Item>
            <Form.Item label={"确认密码"} {...formItemLayout}>
              {getFieldDecorator('repassword', {
                rules: [{required: true, message: '请输入确认密码'}],
              })(<Input type={"password"} placeholder={"请输入确认密码"}/>)}
            </Form.Item>
          </>
        )}
        <Form.Item label={"手机号码"} {...formItemLayout}>
          {getFieldDecorator('mobile', {
            rules: [{required: true, message: '请输入手机号码'}],
          })(<Input placeholder={"请输入手机号码"}/>)}
        </Form.Item>
        <Form.Item label={"邮箱"} {...formItemLayout}>
          {getFieldDecorator('email', {
            rules: [{required: true, message: '请输入邮箱'}],
          })(<Input placeholder={"请输入邮箱"}/>)}
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

export default Form.create()(AdministrationAddModal);
