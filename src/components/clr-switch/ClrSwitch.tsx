import React, {ChangeEvent, useEffect, useState} from 'react';
import './ClrSwitch.scss'
import {withSpinner} from "../hoc/clr-with-spinner/ClrWithSpinner";

interface Props {
  value?: any;
  onChange?: (e: IFormControlChangeEvent) => void;
  activeValue?: any;	// switch 打开时的值
  inactiveValue?: any;	// switch 关闭时的值
  activeText?: string;	// switch 打开时的文字描述
  inactiveText?: string;	// switch 打开时的文字描述
  name?: string;
  disabled?: boolean;
}


const ClrSwitch: React.FC<Props> = (props) => {

  const {disabled = false, activeValue = true, inactiveValue = false, activeText = '启用', inactiveText = '禁用', name, onChange} = props;
  const [_value, _setValue] = useState('');

  useEffect(() => {
    _setValue(props.value);
  }, [props.value]);

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    let currentValue = activeValue;
    if (_value === activeValue) {
      currentValue = inactiveValue;
    }
    _setValue(currentValue);
    if (onChange) {

      onChange({
        target :{
          name: name,
          value: currentValue,
        }
      });
    }
  };

  const isChecked = _value === activeValue;
  const currentText = isChecked ? activeText : inactiveText;
  return (
    <label className={`clr-switch ${isChecked ? 'clr-switch-on' : ''} ${disabled ? 'disabled' : ''}`}>
      <input disabled={disabled} name={name} onChange={(e) => handleValueChange(e)} checked={isChecked}
             type="checkbox" hidden/>
      <i/>
      <span>{currentText}</span>
    </label>
  );
};

export default ClrSwitch;
export const ClrSwitchWithSpinner = withSpinner(ClrSwitch);
export interface IFormControlChangeEvent {
  target: {
    name?: string;
    value: any;
  }
}
