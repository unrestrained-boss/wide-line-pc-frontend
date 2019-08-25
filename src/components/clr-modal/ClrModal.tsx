import React, {useState} from 'react';
import './ClrModal.scss';
import cloneDeep from 'lodash/cloneDeep';

interface Props {
  title?: string;
  data?: any;
  close: () => void;
  onComplete?: () => void;
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
  const injectProps: IModalInjectProps = {
    close: () => props.close(),
    setBackgroundDismiss,
    setShowClose,
    getPreData,
    onComplete: props.onComplete,
  };
  return (<div onClick={(e) => handleContainerClicked(e)}
               className="clr-modal-container" aria-hidden="true">
    <div className="clr-modal-wrapper">
      <div className="clr-modal-header">
        <span className="title">{title}</span>
        {showClose ? (
          <i onClick={() => props.close()}>x</i>
        ) : null}
      </div>
      <div className="clr-modal-inner-body">
        {props.children && (props.children as any)(injectProps)}
      </div>
    </div>
  </div>);
};

export default ClrModal;

export interface IModalInjectProps {
  close: () => void;
  setBackgroundDismiss: (s: boolean) => void;
  setShowClose: (s: boolean) => void;
  getPreData: <T>() => T;
  onComplete?: () => void;
}
