import React from 'react';
import ReactDOM from "react-dom";
import ClrModal from "./ClrModal";

export interface IModalOptions {
  title?: string
}
export const openModal = (component: any, options: IModalOptions) => {
  const container = document.createElement('div');
  document.body.append(container);

  // @ts-ignore
  const Clone = React.cloneElement(<ClrModal title={options.title}>{component}</ClrModal>, {
    Close: () => {
      ReactDOM.unmountComponentAtNode(container);
      container.remove();
    }
  });
  ReactDOM.render(Clone, container)
};
