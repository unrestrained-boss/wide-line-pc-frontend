import React, {ChangeEvent, useEffect, useState} from 'react';
import './ClrRadio.scss';
import isUndefined from 'lodash/isUndefined';

interface Props {
  value?: string;
  onBlur?: (e: ChangeEvent<HTMLLabelElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  disabled?: boolean;
  checked?: boolean;
}

const ClrRadio: React.FC<Props> = (props) => {
  const {value, disabled, onBlur, onChange, name, children} = props;
  const [_checked, _setChecked] = useState(false);
  useEffect(() => {
    _setChecked(isUndefined(props.checked) ? false : props.checked)
  }, [props.checked]);

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVal = !_checked;
    _setChecked(newVal);
    onChange && onChange(e);
  };

  return (
    <label onBlur={onBlur} className={`clr-radio ${disabled ? 'disabled' : ''}`}>
      <input name={name}
             disabled={disabled}
             value={value}
             onChange={(e) => handleValueChange(e)}
             type="radio"
             checked={_checked}
             hidden/>
      <i/>
      <span>{children}{_checked.toString()}</span>
    </label>
  );
};
export default ClrRadio;
