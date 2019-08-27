import React, {MouseEventHandler} from 'react';
import './ClrErrorTip.scss';
import {CSSTransition} from "react-transition-group";

interface Props {
  show?: boolean;
  tip?: string;
  size?: TErrorTipSize;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ClrErrorTip: React.FC<Props> = (props) => {
  const {show = false, tip = 'Sorry, 发生了一点错误, 请稍后再试或者', size, onClick} = props;
  const classNames = ['clr-error-tip'];
  size === 'small' && classNames.push('small');
  return (
    <CSSTransition unmountOnExit in={show} timeout={500} classNames={"tip"}>
      <div className={classNames.join(' ')}>
        {tip}
        <button type={"button"} onClick={(e) => onClick && onClick(e)} className="retry-button">点击重试</button>
      </div>
    </CSSTransition>

  );
};

export default ClrErrorTip;
export type TErrorTipSize = 'normal' | 'lager' | 'small';
