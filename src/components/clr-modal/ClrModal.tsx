import React from 'react';
import './ClrModal.scss'

interface Props {
  Close?: () => void;
  title?: string;
}


const ClrModal: React.FC<Props> = (props) => {

  const handleContainerClicked = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      close();
    }
  };


  const close = () => {
    props.Close && props.Close();
  };
  const {title = ''} = props;
  return (<div onClick={(e) => handleContainerClicked(e)}
               className="clr-modal-container">
    <div className="clr-modal-wrapper">
      <div className="clr-modal-header">
        <span className="title">{title}</span>
        <i onClick={() => close()}>x</i>
      </div>
      <div>
        {props.children}
      </div>
    </div>
  </div>);
};

export default ClrModal;
