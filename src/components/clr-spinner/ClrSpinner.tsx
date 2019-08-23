import React  from 'react';
import './ClrSpinner.scss';

interface Props {
  size?: TSpinnerSize;
}

const ClrSpinner:React.FC<Props> = (props) => {

    const classNames = ['clr-spinner'];
    const {size} = props;
    size === 'lager' && classNames.push('lager');
    size === 'small' && classNames.push('small');
    return (
      <div className={classNames.join(' ')} style={{backgroundImage: `url(${require('./spinner.svg')})`}} />
    );
};

export default ClrSpinner;


export type TSpinnerSize = 'normal' | 'lager' | 'small';

