import React, {useEffect, useRef, useState} from 'react';
import './ClrSpinner.scss';

interface Props {
  size?: TSpinnerSize;
  spinner?: boolean;
  delay?: number;
}

const ClrSpinner: React.FC<Props> = (props) => {
  const {spinner = true, delay = 200, size} = props;
  const [isTimeShow, setIsTimeShow] = useState(false);
  const classNames = ['clr-spinner'];
  let timer = useRef<number | null>(null);
  function clearTimer() {
    if (timer.current) {
      window.clearTimeout(timer.current!);
    }
  }
  useEffect(() => {
    clearTimer();
    if (!spinner) {
      setIsTimeShow(false);
      return;
    }
    timer.current = window.setTimeout(() => {
      if (spinner) {
        setIsTimeShow(true);
      }
    }, delay);
    return () => {
      clearTimer();
    }
  }, [delay, spinner, timer]);
  size === 'lager' && classNames.push('lager');
  size === 'small' && classNames.push('small');
  return isTimeShow ? (
    <div className={classNames.join(' ')} style={{backgroundImage: `url(${require('./spinner.svg')})`}}/>
  ) : null;
};

export default ClrSpinner;


export type TSpinnerSize = 'normal' | 'lager' | 'small';
