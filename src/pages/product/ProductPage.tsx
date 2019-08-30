import React from "react";
import "./ProductPage.scss";
import {Button, Icon} from "antd";
import WLModal from "../../components/wl-modal/WLModal";
import ProductAddModal from "./ProductAddModal";

interface IProps {

}
function handleAdd() {
  WLModal.openModal(ProductAddModal, {
    title: '添加产品',
    defaultCanDismiss: false,
    width: '90%'
  });
  
}
const ProductPage: React.FC<IProps> = (props: IProps) => {
  return (
    <div className={"frame-content"}>
      <div style={{marginBottom: '20px'}}>
        <Button onClick={handleAdd} type={"primary"}>
          <Icon type={"plus"}/>
          添加产品
        </Button>
      </div>
      ProductPage works! 
    </div>
  );
};

export default ProductPage;
