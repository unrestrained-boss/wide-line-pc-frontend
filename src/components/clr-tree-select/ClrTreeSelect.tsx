import React, {useEffect, useState} from "react";
// @ts-ignore
import TreeSelect, {SHOW_ALL} from 'rc-tree-select';
import './ClrTreeSelect.scss';

interface Props {
  name?: string;
  value?: any[];
  treeData: any[];
  labelProp?: string;
  valueProp?: any;
  childrenProp?: string;
  onChange?: (s: {
    target: {
      name?: string;
      value: any[],
    }
  }) => void;
}

function transformLabelAndValue(data: any[],
                                labelProp: string,
                                valueProp: string,
                                childrenProp: string): any[] {
  return data.map(item => {
    let children = [];
    if (item[childrenProp]) {
      // @ts-ignore
      children = transformLabelAndValue(item[childrenProp], labelProp, valueProp, childrenProp);
    }
    return {
      title: item[labelProp],
      value: item[valueProp],
      children,
    };
  });
}

const ClrTreeSelect: React.FC<Props> = (props) => {
  const [_value, _setValue] = useState<any[]>([]);
  const [_treeData, _setTreeData] = useState<any[]>([]);
  const {treeData, labelProp = 'title', valueProp = 'value', childrenProp = 'children'} = props;
  useEffect(() => {
    if (Array.isArray(props.value)) {
      _setValue(props.value!);
    }
  }, [props.value]);
  useEffect(() => {
    _setTreeData(transformLabelAndValue(treeData, labelProp, valueProp, childrenProp));
  }, [childrenProp, labelProp, treeData, valueProp]);

  function handleChange(args: any[]) {
    _setValue(args);
    props.onChange && props.onChange({
      target: {
        name: props.name,
        value: args,
      }
    })
  }

  return (
    <TreeSelect className={"clr-tree-select"} dropdownStyle={{maxHeight: 300, overflow: 'auto'}}
                placeholder={"请选择菜单权限"}
                notFoundContent={"暂无数据"}
                multiple
                treeLine
                maxTagCount={2}
                treeCheckable
                value={_value}
                showCheckedStrategy={SHOW_ALL}
                treeDefaultExpandAll={false}
                onChange={handleChange}
                treeData={_treeData}/>
  );
};

export default ClrTreeSelect;
