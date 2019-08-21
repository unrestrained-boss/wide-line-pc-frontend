import React from 'react';
import ReactDOM from "react-dom";
import ClrModal from "./ClrModal";

export interface IModalOptions {
  title?: string
}

export const openModal = (component: any, options: IModalOptions) => {
  const container = document.createElement('div');
  document.body.append(container);
  const close = () => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
  };
  // @ts-ignore
  const Clone = React.cloneElement(<ClrModal {...options}>{component(close)}</ClrModal>, {
    Close: close
  });
  ReactDOM.render(Clone, container)
};
