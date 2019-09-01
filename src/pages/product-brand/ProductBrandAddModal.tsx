import React, {useEffect, useMemo, useState} from "react";
import {Button, Form, Input, Switch, Spin, message, TreeSelect, Alert} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {IWLModalInjectProps} from "../../components/wl-modal/WLModal";
import ProductBrandService, {IProductBrand} from "../../services/ProductBrandService";
import Tool from "../../utils/Tool";

interface Props extends FormComponentProps<IProductBrand>, IWLModalInjectProps {
}

const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};
const ProductBrandAddModal: React.FC<Props> = (props) => {
  const preData = props.getPreData<IProductBrand>();
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

  function handleDoSubmit(values: IProductBrand) {
    props.setCanClosable(false);
    setSubmitting(true);
    const body: IProductBrand = {
      name: values.name,
      is_bottom: values.is_bottom ? 1 : 0,
      status: values.status ? 1 : 0,
      pid: values.pid,
    };
    if (isEditMode) {
      handleEditSubmit(body);
    } else {
      handleAddSubmit(body);
    }
  }

  async function handleAddSubmit(values: IProductBrand) {
    const [, err] = await ProductBrandService.add(values);
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

  async function handleEditSubmit(values: IProductBrand) {
    const [, err] = await ProductBrandService.update(preData.id!, values);
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
        is_bottom: preData.is_bottom === 1,
        status: preData.status === 1,
        pid: preData.pid,
      });
    }
    // eslint-disable-next-line
  }, []);

  const {data: brandData, isLoading: brandIsLoading, isError: brandIsError, refresh: brandRefresh} = ProductBrandService.useList();
  const treeData = useMemo(() => {
    return [
      {
        title: '根目录',
        value: 0,
        children: Tool.transformTitleAndValue(brandData, [], 'name', 'id'),
      }
    ];
  }, [brandData]);
  return (
    <Spin spinning={submitting || brandIsLoading}>
      {(brandIsError) && (
        <Alert style={{marginTop: '20px'}}
               showIcon
               message={"抱歉"}
               description={(
                 <>
                   <span>出现了一点问题, 请稍后再试或</span>
                   <Button type={"link"} onClick={() => {
                     brandRefresh();
                   }}>点击重试</Button>
                 </>
               )}
               type="error"
               closable
        />
      )}
      <Form layout={"horizontal"} onSubmit={e => handleSubmit(e)}>
        <Form.Item label={"品牌名称"} {...formItemLayout}>
          {getFieldDecorator('name', {
            rules: [{required: true, message: '请输入品牌名称'}],
          })(<Input autoFocus placeholder={"请输入品牌名称"}/>)}
        </Form.Item>
        <Form.Item label={"上级分类"} {...formItemLayout}>
          {getFieldDecorator('pid', {
            rules: [{required: true, message: '请选择上级分类'}],
            initialValue: 0,
          })(<TreeSelect treeData={treeData}
                         treeDefaultExpandAll
                         placeholder={"请选择上级分类"}/>)}
        </Form.Item>
        <Form.Item label={"is_bottom"} {...formItemLayout}>
          {getFieldDecorator('is_bottom', {
            rules: [],
            valuePropName: 'checked',
            initialValue: true,
          })(<Switch checkedChildren={"是"} unCheckedChildren={"否"}/>)}
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

export default Form.create()(ProductBrandAddModal);
