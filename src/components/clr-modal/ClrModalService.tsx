import React from 'react';
import ReactDOM from "react-dom";
import ClrModal from "./ClrModal";

export interface IModalOpenOptions {
  title?: string;
  data?: any;
}

const openModal = (Component: any, options: IModalOpenOptions) => {
  const container = document.createElement('div');
  document.body.append(container);
  const close = () => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
  };

  ReactDOM.render((
    <ClrModal {...options} close={close}>
      {(modalProps: IModalOpenOptions) => <Component {...modalProps} />}
    </ClrModal>
  ), container);
};

const alert = (message: string) => {
  const container = document.createElement('div');
  document.body.append(container);
  const close = () => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
  };

  ReactDOM.render((
    <ClrModal close={close}>
      {(modalProps: IModalOpenOptions) => {
        return (
          <span>{message}</span>
        );
      }}
    </ClrModal>
  ), container);
};
export default {
  openModal,
  alert,
}
