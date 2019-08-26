import React, {MouseEventHandler} from 'react';
import './ClrErrorTip.scss';
import {CSSTransition} from "react-transition-group";

interface Props {
  show?: boolean;
  tip?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ClrErrorTip: React.FC<Props> = (props) => {
  const {show = false, tip = 'Sorry, 发生了一点错误, 请稍后再试或者', onClick} = props;
  return (
    <CSSTransition unmountOnExit in={show} timeout={500} classNames={"tip"}>
      <div className={"clr-error-tip"}>
        {tip}
        <button onClick={(e) => onClick && onClick(e)} className="retry-button">点击重试</button>
      </div>
    </CSSTransition>

  );
};

export default ClrErrorTip;
