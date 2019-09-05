import React, {useEffect, useMemo, useState} from "react";
import {Alert, Button, Form, Icon, Input, Spin, TreeSelect, Upload, Radio, message} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {IWLModalInjectProps} from "../../components/wl-modal/WLModal";
import ProductService, {IProduct} from "../../services/ProductService";
import UserService from "../../services/UserService";
import uniqueId from "lodash/uniqueId";
import {
  uploadCustomRequest,
  uploadGetValueFromEvent,
  uploadPreData,
  uploadResultSerialization
} from "../../utils/Upload";
import BraftEditor, {EditorState} from "braft-editor";
import ProductClassificationService from "../../services/ProductClassificationService";
import ProductBrandService from "../../services/ProductBrandService";
import Tool from "../../utils/Tool";
import WlSkuEditor, {skuValidator} from "../../components/wl-sku-editor/WLSkuEditor";

interface IProps extends FormComponentProps<IProduct>, IWLModalInjectProps {

}

const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};
const ProductAddModal: React.FC<IProps> = (props: IProps) => {
  let preData = props.getPreData<IProduct>();
  const isEditMode = preData !== undefined;
  const [submitting, setSubmitting] = useState(false);
  const [productIsLoading, setProductIsLoading] = useState(false);
  const [productIsError, setProductIsError] = useState(false);
  const {getFieldDecorator, validateFieldsAndScroll, setFieldsValue} = props.form;
  const editorState: EditorState = BraftEditor.createEditorState(null);

  const {data: productClassificationData, isLoading: productClassificationIsLoading, isError: productClassificationIsError, refresh: productClassificationRefresh} = ProductClassificationService.useList();
  const {data: productBrandData, isLoading: productBrandIsLoading, isError: productBrandIsError, refresh: productBrandRefresh} = ProductBrandService.useList();
  const productClassificationTreeData = useMemo(() => {
    return Tool.transformTitleAndValue(productClassificationData, [], 'name', 'id');
  }, [productClassificationData]);
  const productBrandTreeData = useMemo(() => {
    return Tool.transformTitleAndValue(productBrandData, [], 'name', 'id');
  }, [productBrandData]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    validateFieldsAndScroll((error, values) => {
      if (error) {
        return;
      }
      props.setCanClosable(false);
      setSubmitting(true);
      const detailsState = values.details as EditorState;
      const files = uploadResultSerialization(values.thumbs as any[], process.env.REACT_APP_API_BASE_URL);

      const body: IProduct = {
        name: values.name,
        goods_num: values.goods_num,
        cid_info: values.cid_info,
        bid_info: values.bid_info,
        thumbs: files.join(','),
        sku: JSON.stringify(values.sku),
        details: detailsState.toHTML(),
        status: values.status,
      };
      if (isEditMode) {
        handleEditSubmit(body);
      } else {
        handleAddSubmit(body);
      }
      // setTimeout(() => {
      //   setSubmitting(false);
      //   props.setCanClosable(true);
      //   props.setCanDismiss(true);
      //   console.log(body);
      // }, 1000);
    });
  }

  async function handleAddSubmit(values: IProduct) {
    const [, err] = await ProductService.add(values);
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

  async function handleEditSubmit(values: IProduct) {
    const [, err] = await ProductService.update(preData.id!, values);
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
      ;(async () => {
        setProductIsLoading(true);
        setProductIsError(false);
        const [data, err] = await ProductService.detail<IProduct>(preData.id!);
        setProductIsLoading(false);
        if (err) {
          setProductIsError(true);
        }
        setFieldsValue({
          name: data.name,
          goods_num: data.goods_num,
          thumbs: data.thumbs ? uploadPreData(preData.thumbs as string[]) : [],
          cid_info: data.cid_info,
          bid_info: data.bid_info,
          sku: (data.sku as any[]).map(item => {
            return {...item, __key: uniqueId()};
          }),
          details: BraftEditor.createEditorState(data.details),
          status: data.status,
        });
      })();
    }
    // eslint-disable-next-line
  }, []);
  const step1 = (
    <>
      <Form.Item label={"产品名称"} {...formItemLayout}>
        {getFieldDecorator('name', {
          rules: [{required: true, message: '请输入产品名称'}],
        })(<Input autoFocus placeholder={"请输入产品名称"}/>)}
      </Form.Item>

      <Form.Item label={"产品编码"} {...formItemLayout}>
        {getFieldDecorator('goods_num', {
          rules: [{required: true, message: '请输入产品编码'}],
        })(<Input placeholder={"请输入产品编码"}/>)}
      </Form.Item>
      <Form.Item label={"产品品牌"} {...formItemLayout}>
        {getFieldDecorator('bid_info', {
          rules: [{required: true, message: '请选择产品品牌'}],
        })(<TreeSelect treeData={productBrandTreeData}
                       treeDefaultExpandAll
                       placeholder={"请选择产品品牌"}/>)}
      </Form.Item>
      <Form.Item label={"产品分类"} {...formItemLayout}>
        {getFieldDecorator('cid_info', {
          rules: [{required: true, message: '请选择产品分类'}],
        })(<TreeSelect treeData={productClassificationTreeData}
                       treeDefaultExpandAll
                       placeholder={"请选择产品分类"}/>)}
      </Form.Item>
      <Form.Item label={"sku设置"} {...formItemLayout}>
        {getFieldDecorator('sku', {
          rules: [
            {required: true, message: '请进行 suk 设置'},
            {validator: skuValidator}
          ],
          initialValue: []
        })(<WlSkuEditor/>)}
      </Form.Item>
      <Form.Item label={"产品状态"} {...formItemLayout}>
        {getFieldDecorator('status', {
          rules: [
            {required: true, message: '请选择状态'},
          ],
          initialValue: 1,
        })(<Radio.Group size={"small"} buttonStyle="solid">
          <Radio.Button value={0}>下架</Radio.Button>
          <Radio.Button value={1}>上架</Radio.Button>
          <Radio.Button value={2}>后台下架</Radio.Button>
          <Radio.Button value={3}>草稿</Radio.Button>
        </Radio.Group>)}
      </Form.Item>
    </>
  );

  const step2 = (
    <>
      <Form.Item label={"产品相册"} {...formItemLayout}>
        {getFieldDecorator('thumbs', {
          rules: [{required: true, message: '请输入产品相册'}],
          initialValue: [],
          valuePropName: 'fileList',
          getValueFromEvent: uploadGetValueFromEvent,
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
          提交产品
        </Button>
      </Form.Item>
    </>
  );
  return (

    <Spin spinning={submitting || productIsLoading || productClassificationIsLoading || productBrandIsLoading}>
      {(productBrandIsError || productIsError || productClassificationIsError) && (
        <Alert style={{marginTop: '20px'}}
               showIcon
               message={"抱歉"}
               description={(
                 <>
                   <span>出现了一点问题, 请稍后再试或</span>
                   <Button type={"link"} onClick={() => {
                     productBrandRefresh();
                     productClassificationRefresh();
                   }}>点击重试</Button>
                 </>
               )}
               type="error"
               closable
        />
      )}
      <Form layout={"horizontal"} onSubmit={e => handleSubmit(e)}>
        {step1}{step2}
      </Form>
    </Spin>
  );
};

export default Form.create()(ProductAddModal);
