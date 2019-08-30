import React, {useState} from "react";
import {Steps} from "antd";

interface IProps {

}

const ProductAddModal: React.FC<IProps> = (props: IProps) => {
  const [currentStep] = useState(0);
  // const [currentStep, setCurrentStep] = useState(0);
  return (
    <div>
      <Steps current={currentStep}>
        <Steps.Step title="产品基本信息" description="This is a description."/>
        <Steps.Step title="产品促销信息" description="This is a description."/>
        <Steps.Step title="产品属性设置" description="This is a description."/>
        <Steps.Step title="选择商品关联" description="This is a description."/>
      </Steps>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      ProductAddModal works!
    </div>
  );
};

export default ProductAddModal;
