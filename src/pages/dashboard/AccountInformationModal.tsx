import {IWLModalInjectProps} from "../../components/wl-modal/WLModal";
import React from "react";
import { Row, Col } from 'antd';

interface Props extends IWLModalInjectProps {

}

const labelSpan = 4;
const valueSpan = 20;
const AccountInformationModal: React.FC<Props> = (props) => {
  return (
    <div>
      <Row>
        <Col span={labelSpan}>用户名: </Col>
        <Col span={valueSpan}>admin</Col>
      </Row>
      <Row>
        <Col span={labelSpan}>昵称: </Col>
        <Col span={valueSpan}>超级管理员</Col>
      </Row>
      <Row>
        <Col span={labelSpan}>电话号码: </Col>
        <Col span={valueSpan}>admin</Col>
      </Row>
      <Row>
        <Col span={labelSpan}>用户名: </Col>
        <Col span={valueSpan}>admin</Col>
      </Row>
      <Row>
        <Col span={labelSpan}>用户名: </Col>
        <Col span={valueSpan}>admin</Col>
      </Row>
      <Row>
        <Col span={labelSpan}>用户名: </Col>
        <Col span={valueSpan}>admin</Col>
      </Row>
      <Row>
        <Col span={labelSpan}>用户名: </Col>
        <Col span={valueSpan}>admin</Col>
      </Row>
    </div>
  );
};

export default AccountInformationModal;
