import React, {PureComponent} from 'react';
import './ClrInput.scss'

interface OwnProps {
  value?: string;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  size?: TInputSize;
}

type Props = OwnProps;

type State = Readonly<{}>;

class ClrInput extends PureComponent<Props, State> {
  readonly state: State = {};

  render() {
    const {value, size, name, type, placeholder, onBlur, onChange, disabled} = this.props;
    const classNames = ['clr-input'];
    size === 'lager' && classNames.push('lager');
    size === 'small' && classNames.push('small');
    return (
      <input name={name}
             value={value}
             onBlur={e => onBlur && onBlur(e)}
             onChange={e => onChange && onChange(e)}
             disabled={disabled}
             placeholder={placeholder}
             className={classNames.join(' ')}
             type={type}/>
    );
  }
}

export default ClrInput;

export type TInputSize = 'normal' | 'lager' | 'small';

