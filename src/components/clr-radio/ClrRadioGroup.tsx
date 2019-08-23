import React, {ChangeEvent, useEffect, useState} from 'react';
import {map} from "../../utils/ReactChildren";

import isUndefined from 'lodash/isUndefined';

interface Props {
  value?: string;
  onChange?: (e: IFormControlChangeEvent) => void;
  onBlur?: (e: ChangeEvent<HTMLDivElement>) => void;
  name?: string;
}

const ClrRadioGroup: React.FC<Props> = (props) => {
  const {onChange, onBlur, name} = props;
  const [_value, _setValue] = useState<any>('');
  useEffect(() => {
    _setValue(isUndefined(props.value) ? '' : props.value);
  }, [props.value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    _setValue(e.target.value);
    onChange && onChange({
      target: {
        name: name,
        value: e.target.value,
      }
    });
  };
  const childrenTransform = map(props.children!, (child, index) => {
    // @ts-ignore
    if (child.type.name === 'ClrRadio') {
      return React.cloneElement(child, {
        key: index.toString(),
        checked: child.props.value === _value,
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
export default ClrRadioGroup;

export interface IFormControlChangeEvent {
  target: {
    name?: string;
    value: any;
  }
}
