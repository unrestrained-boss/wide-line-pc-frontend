import React, {useEffect, useState} from "react";
// @ts-ignore
import TreeSelect, {SHOW_ALL} from 'rc-tree-select';
import './ClrTreeSelect.scss';

interface IRootNode {
  title: string;
  value: any;
}
interface Props {
  name?: string;
  value?: any[];
  disabledValues?: any[];
  treeData: any[];
  treeCheckable?: boolean;
  rootNode?: IRootNode;
  multiple?: boolean;
  placeholder?: string;
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


const ClrTreeSelect: React.FC<Props> = (props) => {
  const [_value, _setValue] = useState<any[]>([]);
  const [_treeData, _setTreeData] = useState<any[]>([]);
  const {treeCheckable = false, multiple = false, placeholder = ''} = props;
  useEffect(() => {
    _setValue(props.value!);
  }, [props.value]);
  useEffect(() => {
    const {rootNode, disabledValues = [], labelProp = 'title', valueProp = 'value', childrenProp = 'children'} = props;

    function transformLabelAndValue(data: any[],): any[] {
      return data.map(item => {
        let children = [];
        if (item[childrenProp]) {
          children = transformLabelAndValue(item[childrenProp]);
        }
        return {
          title: item[labelProp],
          value: item[valueProp],
          disabled: disabledValues.indexOf(item[valueProp]) !== -1,
          children,
        };
      });
    }

    let trees = transformLabelAndValue(props.treeData);
    if (rootNode) {
      trees = [{title: rootNode.title, value: rootNode.value, children: trees,}];
    }
    _setTreeData(trees);
  }, [props]);


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
                placeholder={placeholder}
                notFoundContent={"暂无数据"}
                multiple={multiple}
                treeLine
                maxTagCount={2}
                treeCheckable={treeCheckable}
                value={_value}
                showCheckedStrategy={SHOW_ALL}
                treeDefaultExpandAll={false}
                onChange={handleChange}
                treeData={_treeData}/>
  );
};

export default ClrTreeSelect;
