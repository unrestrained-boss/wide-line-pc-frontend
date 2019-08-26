import React, {useEffect, useState} from "react";
// @ts-ignore
import TreeSelect, {SHOW_ALL} from 'rc-tree-select';
import './ClrTreeSelect.scss';

interface Props {
  name?: string;
  value?: any[];
  onChange?: (s: {
    target: {
      name?: string;
      value: any[],
    }
  }) => void;
}

const ClrTreeSelect: React.FC<Props> = (props) => {
  const [_value, _setValue] = useState<any[]>([]);
  useEffect(() => {
    if (Array.isArray(props.value)) {
      _setValue(props.value!);
    }
  }, [props.value]);

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
                treeData={[
                  {
                    title: '系统管理', value: 1, children: [
                      {title: 'banner 管理', value: 5},
                      {title: '管理员管理', value: 6},
                      {title: '角色管理', value: 7},
                      {title: '物流公司管理', value: 8},
                      {title: '日志管理', value: 14},
                    ]
                  },
                  {
                    title: '用户管理', value: 2, children: [
                      {title: '用户管理', value: "36"},
                    ]
                  },
                  {
                    title: '订单管理', value: 3, children: [
                      {title: '订单管理', value: 10},
                      {title: '奖励管理', value: 11},
                    ]
                  },
                  {
                    title: '产品管理', value: 4, children: [
                      {title: '产品管理', value: 12},
                      {title: '分类管理', value: 13},
                    ]
                  },
                ]}/>
  );
};

export default ClrTreeSelect;
