import React, {ChangeEvent, useEffect, useState} from 'react';
import './ClrCheckbox.scss';
import isUndefined from 'lodash/isUndefined';

interface Props {
  value?: any;
  onBlur?: (e: ChangeEvent<HTMLLabelElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  disabled?: boolean;
  checked?: boolean;
}

const ClrCheckbox: React.FC<Props> = (props) => {
  const {value, disabled, name, onBlur, onChange, children} = props;
  const [_checked, _setChecked] = useState(false);
  useEffect(() => {
    _setChecked(isUndefined(props.checked) ? false : props.checked);
  }, [props.checked]);

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    _setChecked(e.target.checked);
    onChange && onChange(e);
  };

  return (
    <label onBlur={onBlur} className={`clr-checkbox ${disabled ? 'disabled' : ''}`}>
      <input disabled={disabled}
             name={name}
             value={value}
             onChange={(e) => handleValueChange(e)}
             checked={_checked}
             type="checkbox"
             hidden/>
      <i/>
      <span>{children}{_checked}</span>
    </label>
  );
};
export default ClrCheckbox;
