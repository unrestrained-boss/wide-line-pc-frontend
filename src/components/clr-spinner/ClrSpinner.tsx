import React, { PureComponent } from 'react';
import './ClrSpinner.scss';

interface OwnProps {
  size?: TSpinnerSize;
}

type Props = OwnProps;

type State = Readonly<{

}>;

class ClrSpinner extends PureComponent<Props, State> {
  readonly state: State = {

  };

  render() {
    const classNames = ['clr-spinner'];
    const {size} = this.props;
    size === 'lager' && classNames.push('lager');
    size === 'small' && classNames.push('small');
    return (
      <div className={classNames.join(' ')} style={{backgroundImage: `url(${require('./spinner.svg')})`}} />
    );
  }
}

export default ClrSpinner;


export type TSpinnerSize = 'normal' | 'lager' | 'small';

