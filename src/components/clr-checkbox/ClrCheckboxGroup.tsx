import React, {ChangeEvent, useEffect, useState} from 'react';
import {map} from "../../utils/ReactChildren";

import isUndefined from 'lodash/isUndefined';

interface Props {
  value?: any[];
  onChange?: (e: IFormControlChangeEvent) => void;
  onBlur?: (e: ChangeEvent<HTMLDivElement>) => void;
  name?: string;
}

const ClrCheckboxGroup: React.FC<Props> = (props) => {
  const {onChange, onBlur, name} = props;
  const [_value, _setValue] = useState<any[]>([]);
  useEffect(() => {
    _setValue(isUndefined(props.value) ? [] : props.value);
  }, [props.value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      _value.push(e.target.value);
    } else {
      const index = _value.indexOf(e.target.value);
      if (index !== -1) {
        _value.splice(index, 1);
      }
    }
    _setValue(_value);
    onChange && onChange({
      target: {
        name: name,
        value: _value,
      }
    });
  };
  const childrenTransform = map(props.children!, (child, index) => {
    // @ts-ignore
    if (child.type.name === 'ClrCheckbox') {
      return React.cloneElement(child, {
        key: index.toString(),
        checked: _value.includes(child.props.value),
        onChange: handleChange,
      });
    }
    return child;
  });

  return (
    <div onBlur={onBlur}>
      {childrenTransform}
    </div>
  );
};
export default ClrCheckboxGroup;

export interface IFormControlChangeEvent {
  target: {
    name?: string;
    value: any;
  }
}
