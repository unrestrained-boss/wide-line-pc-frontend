import React, {useEffect, useMemo, useState} from "react";
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
  const {treeCheckable = false, multiple = false, placeholder = ''} = props;
  useEffect(() => {
    _setValue(props.value!);
  }, [_value, props.value]);
  const {disabledValues = [], labelProp = 'title', valueProp = 'value', childrenProp = 'children'} = props;
  const _treeData = useMemo(() => {
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
    if (props.rootNode) {
      trees = [{title: props.rootNode.title, value: props.rootNode.value, children: trees,}];
    }
    return trees;
  }, [props.treeData, props.rootNode, childrenProp, labelProp, valueProp, disabledValues]);

  function handleChange(args: any[]) {
    _setValue(args);
    if (props.onChange) {
      props.onChange({
        target: {
          name: props.name,
          value: args,
        }
      });
    }
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
                treeNodeFilterProp={"title"}
                showCheckedStrategy={SHOW_ALL}
                treeDefaultExpandAll={false}
                onChange={handleChange}
                treeData={_treeData}/>
  );
};

export default ClrTreeSelect;
