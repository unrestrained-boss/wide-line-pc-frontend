import React, {PureComponent} from 'react';
import './ClrButton.scss'

interface OwnProps {
  type?: TButtonType;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

type Props = OwnProps;

type State = Readonly<{}>;

class ClrButton extends PureComponent<Props, State> {
  readonly state: State = {};

  render() {
    const {type, disabled, onClick} = this.props;
    const classNames = ['clr-button'];
    type === 'primary' && classNames.push('clr-button-primary');
    type === 'success' && classNames.push('clr-button-success');
    type === 'danger' && classNames.push('clr-button-danger');
    type === 'warning' && classNames.push('clr-button-warning');

    return (
      <button onClick={(e) => onClick && onClick(e)} disabled={disabled} className={classNames.join(' ')}>{this.props.children}</button>
    );
  }
}

export default ClrButton;

export type TButtonType = 'normal' | 'primary' | 'success' | 'danger' | 'warning';

