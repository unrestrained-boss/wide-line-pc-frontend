import React from 'react';
import './ClrButton.scss'
import ClrSpinner from "../clr-spinner/ClrSpinner";

interface Props {
  type?: TButtonType;
  disabled?: boolean;
  nativeType?: 'submit' | 'reset' | 'button';
  loading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ClrButton: React.FC<Props> = (props) => {
  const {type, disabled, onClick, nativeType = 'button', loading = false, children} = props;
  const classNames = ['clr-button'];
  type === 'primary' && classNames.push('clr-button-primary');
  type === 'success' && classNames.push('clr-button-success');
  type === 'danger' && classNames.push('clr-button-danger');
  type === 'warning' && classNames.push('clr-button-warning');

  return (
    <button type={nativeType}
            onClick={(e) => onClick && onClick(e)}
            disabled={loading || disabled}
            className={classNames.join(' ')}>
      {loading ? (
        <>
          <ClrSpinner delay={0} size={"small"} spinner={loading}/> &nbsp;
        </>
      ) : null }
      {children}
    </button>
  );
};
export default ClrButton;
export type TButtonType = 'normal' | 'primary' | 'success' | 'danger' | 'warning';

