import React from 'react';
import './ClrButton.scss'

interface Props {
  type?: TButtonType;
  disabled?: boolean;
  nativeType?: 'submit' | 'reset' | 'button';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ClrButton: React.FC<Props> = (props) => {
  const {type, disabled, onClick, nativeType = 'button', children} = props;
  const classNames = ['clr-button'];
  type === 'primary' && classNames.push('clr-button-primary');
  type === 'success' && classNames.push('clr-button-success');
  type === 'danger' && classNames.push('clr-button-danger');
  type === 'warning' && classNames.push('clr-button-warning');

  return (
    <button type={nativeType}
            onClick={(e) => onClick && onClick(e)}
            disabled={disabled}
            className={classNames.join(' ')}>
      {children}
    </button>
  );
};
export default ClrButton;
export type TButtonType = 'normal' | 'primary' | 'success' | 'danger' | 'warning';

