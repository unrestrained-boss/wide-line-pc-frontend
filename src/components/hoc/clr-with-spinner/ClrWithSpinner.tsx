import React, {ComponentType, useEffect, useRef, useState} from 'react';
import './ClrWithSpinner.scss'
import ClrSpinner, {TSpinnerSize} from "../../clr-spinner/ClrSpinner";

interface WithSpinnerProps {
  spinner: boolean;
  spinnerSize?: TSpinnerSize;
  showText?: boolean;
  spinnerText?: string;
  delay?: number;
  position?: TSpinnerPosition;
}

export const withSpinner = <P extends object>(
  WrappedComponent: ComponentType<P>
) =>
  (props: P & WithSpinnerProps) => {
    const {spinner = true, position = 'center', showText = false, delay = 200, spinnerText = '努力加载中...', spinnerSize = 'small'} = props;
    const [isTimeShow, setIsTimeShow] = useState(false);
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
    return (
      <div className="clr-with-spinner-wrapper">
        <WrappedComponent {...props} />
        {!isTimeShow ? null : <div className="inner"
                                   style={{alignItems: position}}>
          <ClrSpinner delay={0} size={spinnerSize}/>
          {showText ? <span>&nbsp;&nbsp;&nbsp;{spinnerText}</span> : null}
        </div>}
      </div>
    );
  };
export type TSpinnerPosition = 'flex-start' | 'center' | 'flex-end';
