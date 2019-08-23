import React, {ChangeEvent, useEffect, useState} from 'react';
import './ClrRadio.scss';

interface Props {
  value?: any;
  activeValue?: any;	// radio 选中的值
  name?: string;
  disabled?: boolean;
}

const ClrRadio: React.FC<Props> = (props) => {
  const {disabled, activeValue = true, name, children} = props;
  const [_value, _setValue] = useState(activeValue);
  const isChecked = _value === activeValue;
  useEffect(() => {
    _setValue(props.value)
  }, [props.value]);

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === 'on') {
      _setValue(activeValue);
    } else {
      _setValue(undefined);
    }
  };

  return (
    <label className={`clr-radio ${disabled ? 'disabled' : ''}`}>
      <input name={name}
             disabled={disabled}
             onChange={(e) => handleValueChange(e)}
             type="radio"
             checked={isChecked}
             hidden/>
      <i/>
      <span>{children}</span>
    </label>
  );
};
export default ClrRadio;
