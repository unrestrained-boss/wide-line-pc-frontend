import React, {useState} from "react";
import {Button, Form, Icon, Input, InputNumber, Spin, Upload} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {IWLModalInjectProps} from "../../components/wl-modal/WLModal";
import {IProduct} from "../../services/ProductService";
import TextArea from "antd/lib/input/TextArea";
import UserService from "../../services/UserService";
import {uploadCustomRequest, uploadResultSerialization} from "../../utils/Upload";
import BraftEditor, {EditorState} from "braft-editor";

interface IProps extends FormComponentProps<IProduct>, IWLModalInjectProps {

}

const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};
const ProductAddModal: React.FC<IProps> = (props: IProps) => {
  const [submitting, setSubmitting] = useState(false);
  const {getFieldDecorator, validateFieldsAndScroll} = props.form;
  const editorState: EditorState = BraftEditor.createEditorState(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    validateFieldsAndScroll((error, values) => {
      if (error) {
        return;
      }
      setSubmitting(true);
      props.setCanClosable(false);
      const detailsState = values.details as EditorState;
      const files = uploadResultSerialization((values.thumbs as any).fileList, process.env.REACT_APP_API_BASE_URL);

      const body: IProduct = {
        user_id: values.user_id,
        name: values.name,
        goods_num: values.goods_num,
        min_price: values.min_price,
        thumbs: files,
        details: detailsState.toHTML(),
        status: values.status,
        pid: values.pid,
      };
      setTimeout(() => {
        setSubmitting(false);
        props.setCanClosable(true);
        console.log(body);
      }, 1000);
    });
  }


  const step1 = (
    <>
      <h4>基本信息</h4>
      <Form.Item label={"产品分类"} {...formItemLayout}>
        {getFieldDecorator('name', {
          rules: [{required: true, message: '请输入产品分类'}],
        })(<Input autoFocus placeholder={"请输入产品分类"}/>)}
      </Form.Item>

      <Form.Item label={"产品名称"} {...formItemLayout}>
        {getFieldDecorator('name', {
          rules: [{required: true, message: '请输入产品名称'}],
        })(<Input placeholder={"请输入产品名称"}/>)}
      </Form.Item>

      <Form.Item label={"产品副标题"} {...formItemLayout}>
        {getFieldDecorator('name', {
          rules: [{required: true, message: '请输入产品副标题'}],
        })(<Input placeholder={"请输入产品副标题"}/>)}
      </Form.Item>
      <Form.Item label={"产品品牌"} {...formItemLayout}>
        {getFieldDecorator('name', {
          rules: [{required: true, message: '请输入产品品牌'}],
        })(<Input placeholder={"请输入产品品牌"}/>)}
      </Form.Item>
      <Form.Item label={"产品介绍"} {...formItemLayout}>
        {getFieldDecorator('name', {
          rules: [{required: true, message: '请输入产品介绍'}],
        })(<TextArea placeholder={"请输入产品介绍"}/>)}
      </Form.Item>
      <Form.Item label={"产品货号"} {...formItemLayout}>
        {getFieldDecorator('goods_num', {
          rules: [{required: true, message: '请输入产品货号'}],
        })(<Input placeholder={"请输入产品货号"}/>)}
      </Form.Item>
    </>
  );
  const step2 = (
    <>
      <h4>促销信息</h4>
      <Form.Item label={"成本价"} {...formItemLayout}>
        {getFieldDecorator('price', {
          rules: [{required: true, message: '请输入成本价'}],
        })(<InputNumber min={0} autoFocus placeholder={"请输入成本价"}/>)}
      </Form.Item>
      <Form.Item label={"市场价"} {...formItemLayout}>
        {getFieldDecorator('price', {
          rules: [{required: true, message: '请输入市场价'}],
        })(<InputNumber min={0} autoFocus placeholder={"请输入市场价"}/>)}
      </Form.Item>
      <Form.Item label={"产品库存"} {...formItemLayout}>
        {getFieldDecorator('price', {
          rules: [{required: true, message: '请输入产品库存'}],
        })(<InputNumber min={0} autoFocus placeholder={"请输入产品库存"}/>)}
      </Form.Item>
    </>
  );
  const step3 = (
    <>
      <h4>属性信息</h4>
      <Form.Item label={"产品相册"} {...formItemLayout}>
        {getFieldDecorator('thumbs', {
          rules: [{required: true, message: '请输入产品相册'}],
        })(<Upload
          data={{type: 'user'}}
          headers={{'X-Token': UserService.getUserToken()!}}
          customRequest={uploadCustomRequest}
          action={`${process.env.REACT_APP_API_BASE_URL}/upload/files`}
          listType="picture-card">
          <Icon type="plus"/>
          <div className="ant-upload-text">选择文件</div>
        </Upload>)}
      </Form.Item>
      <Form.Item style={{marginBottom: 0}} label={"产品详情"} {...formItemLayout}/>
      <Form.Item labelCol={{span: 24}} wrapperCol={{span: 24}}>
        {getFieldDecorator('details', {
          rules: [{
            required: true,
            validator: (_, value, callback) => {
              if (value.isEmpty()) {
                callback('请输入产品详情')
              } else {
                callback()
              }
            }
          }],
          initialValue: editorState,
        })(<BraftEditor placeholder={"请输入产品详情"}/>)}
      </Form.Item>
      <Form.Item style={{textAlign: 'right'}}>
        <Button type="primary"
                block
                htmlType="submit">
          完成, 提交产品
        </Button>
      </Form.Item>
    </>
  );
  return (

    <Spin spinning={submitting}>
      <Form layout={"horizontal"} onSubmit={e => handleSubmit(e)}>
        {step1}{step2}{step3}
      </Form>
    </Spin>
  );
};

export default Form.create()(ProductAddModal);
