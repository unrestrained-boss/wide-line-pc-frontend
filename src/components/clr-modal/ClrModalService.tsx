import React from 'react';
import ReactDOM from "react-dom";
import ClrModal from "./ClrModal";

export interface IModalOptions {
  title?: string
}

export const openModal = (Component: any, options: IModalOptions) => {
  const container = document.createElement('div');
  document.body.append(container);
  const close = () => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
  };

  ReactDOM.render((
    <ClrModal {...options} close={close}>
      {(modalProps: IModalOptions) => <Component {...modalProps} />}
    </ClrModal>
  ), container)
};
