import React, {useEffect, useState} from 'react';
import './ClrInput.scss'

interface Props {
  value?: string;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  size?: TInputSize;
}


const ClrInput: React.FC<Props> = (props) => {
  const [_value, setValue] = useState('');
  const {size, name, type, placeholder, onBlur, onChange, disabled} = props;
  const classNames = ['clr-input'];
  size === 'lager' && classNames.push('lager');
  size === 'small' && classNames.push('small');
  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);
  return (
    <input name={name}
           value={_value}
           onBlur={e => onBlur && onBlur(e)}
           onChange={e => {
             setValue(e.target.value);
             onChange && onChange(e);
           }}
           disabled={disabled}
           placeholder={placeholder}
           className={classNames.join(' ')}
           type={type}/>
  );
};

export default ClrInput;

export type TInputSize = 'normal' | 'lager' | 'small';

