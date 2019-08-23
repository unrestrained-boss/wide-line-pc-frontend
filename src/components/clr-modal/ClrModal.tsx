import React, {useState} from 'react';
import './ClrModal.scss';
import cloneDeep from 'lodash/cloneDeep';

interface Props {
  title?: string;
  data?: any;
  close: () => void;
}

const ClrModal: React.FC<Props> = (props) => {
  const {title = ''} = props;
  const [backgroundDismiss, setBackgroundDismiss] = useState(true);
  const [showClose, setShowClose] = useState(true);
  const handleContainerClicked = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!backgroundDismiss) {
      return;
    }
    if (e.currentTarget === e.target) {
      props.close();
    }
  };
  function getPreData<T>() {
    return cloneDeep(props.data as T);
  }
  return (<div onClick={(e) => handleContainerClicked(e)}
               className="clr-modal-container">
    <div className="clr-modal-wrapper">
      <div className="clr-modal-header">
        <span className="title">{title}</span>
        {showClose ? (
          <i onClick={() => props.close()}>x</i>
        ): null}
      </div>
      <div>
        {props.children && (props.children as any)({
          close: () => props.close(),
          setBackgroundDismiss,
          setShowClose,
          getPreData,
        })}
      </div>
    </div>
  </div>);
};

export default ClrModal;

export interface IModalInjectProps {
  close: () => void;
  setBackgroundDismiss: (s:boolean) => void;
  setShowClose: (s:boolean) => void;
  getPreData: <T>() => T;
}
