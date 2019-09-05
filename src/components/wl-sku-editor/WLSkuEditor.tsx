import React from "react";
import "./WlSkuEditor.scss";
import {Button, Icon, Input, InputNumber, Popconfirm} from "antd";
import uniqueId from "lodash/uniqueId";
import isEmpty from "lodash/isEmpty";

interface IProps {
  value?: Sku[],
  onChange?: (s: Sku[]) => void;

}

function getRow(): Sku {
  return {
    __key: uniqueId(),
    value: '',
    sock: undefined,
    price: undefined,
  };
}


const WlSkuEditor: React.FC<IProps> = (props: IProps, ref) => {
  const {value = [], onChange} = props;

  function emitChange(skus: Sku[]) {
    if (onChange) {
      onChange(skus)
    }
  }

  function handleAddSku() {
    const newSkus = [...value, getRow()];
    // setSkus(newSkus);
    emitChange(newSkus);
  }

  function handleConfirm(index: number) {
    const newSkus = [...value];
    newSkus.splice(index, 1);
    // setSkus(newSkus);
    emitChange(newSkus);
  }

  function handleSetRow(index: number, sku: Sku) {
    const newSkus = [...value];
    newSkus[index] = sku;
    // setSkus(newSkus);
    emitChange(newSkus);
  }
  // useEffect(() => {
  //   setSkus(value.map(item => {
  //     return {...item, __key: item.__key || uniqueId()};
  //   }));
  // }, [value]);
  return (
    <ul ref={ref} className={"wl-sku-editor"}>
      {value.map((sku, index) => {
        return (
          <li key={sku.__key} className={"wl-sku-editor-item"}>
            <Input value={sku.value} onChange={e => {
              sku.value = e.target.value;
              handleSetRow(index, sku);
            }} placeholder={"请输入规格"}/>
            <div style={{width: '5px'}}/>
            <InputNumber value={sku.sock}
                         onChange={e => {
                           sku.sock = e;
                           handleSetRow(index, sku);
                         }}
                         min={1}
                         precision={0}
                         placeholder={"请输入库存"}/>
            <div style={{width: '5px'}}/>
            <InputNumber value={sku.price}
                         onChange={e => {
                           sku.price = e;
                           handleSetRow(index, sku);
                         }}
                         min={0.01}
                         precision={2}
                         formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                         parser={value => value!.replace(/¥\s?|(,*)/g, '')}
                         placeholder={"请输入价格"}/>
            <Popconfirm
              title="确认删除该 SKU 吗?"
              onConfirm={() => handleConfirm(index)}
              okText="确认"
              cancelText="取消"
              disabled={index === 0}
            >
              <Button disabled={index === 0}
                      type={"link"}
                      size={"small"}>删除</Button>
            </Popconfirm>
          </li>
        );
      })}
      <li className="wl-sku-editor-add">
        <Button onClick={handleAddSku}
                type={"primary"}
                size={"default"}>
          <Icon type={"plus"}/>
          <span>添加新的 sku</span>
        </Button>
      </li>
    </ul>
  );
};

export default React.forwardRef(WlSkuEditor);

interface Sku {
  __key?: string;
  value: string;
  sock?: number;
  price?: number;
}

function checkIsNumber(value: number) {
  value = +value;
  return !isNaN(value);
}

export function skuValidator(rule: any, value: any, callback: any) {
  try {
    value = value as Sku[] || [];
    // if (value.length === 0) {
    //   callback("请进行 SKU 设置");
    // } else {
    for (let i = 0, j = value.length; i < j; i++) {
      const item = value[i];
      if (isEmpty(item.value)) {
        callback("规格格式错误");
        break;
      }
      if (!checkIsNumber(item.sock)) {
        callback("库存格式错误");
        break;
      }
      if (!checkIsNumber(item.price)) {
        callback("价格格式错误");
        break;
      }
    }
    // }

    callback();
  } catch (e) {
    callback(e.message);
  }
}
