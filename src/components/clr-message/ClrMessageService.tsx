import ReactDOM from "react-dom";
import React from "react";
import './ClrMessage.scss'

interface IMessageQuickOptions {
  position?: TMessagePosition;
}

interface IMessageOpenOptions extends IMessageQuickOptions {
  type?: TMessageType;
}

const showMessage = (Component: any, options: IMessageOpenOptions = {}) => {
  const container = document.createElement('div');
  document.body.append(container);
  const close = () => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
  };
  const classNames = ['clr-message-wrapper'];
  options!.position === 'center' && classNames.push('center');
  options!.position === 'bottom' && classNames.push('bottom');
  const bodyClassNames = ['clr-message-body'];
  options!.type === 'success' && bodyClassNames.push('success');
  options!.type === 'warning' && bodyClassNames.push('warning');
  options!.type === 'error' && bodyClassNames.push('error');
  options!.type === 'info' && bodyClassNames.push('info');
  ReactDOM.render((
    <div className={classNames.join(' ')}>
      <div className={bodyClassNames.join(' ')}>
        {Component}
      </div>
    </div>
  ), container);
  setTimeout(() => {
    close();
  }, 5000);
};
const success = (Component: any, options?: IMessageQuickOptions) => {
  showMessage(Component, {
    type: 'success',
    ...options
  })
};
const warning = (Component: any, options: IMessageQuickOptions = {}) => {
  showMessage(Component, {
    type: 'warning',
    ...options
  })
};
const error = (Component: any, options: IMessageQuickOptions = {}) => {
  showMessage(Component, {
    type: 'error',
    ...options
  })
};
const info = (Component: any, options: IMessageQuickOptions = {}) => {
  showMessage(Component, {
    type: 'info',
    ...options
  })
};
const show = (Component: any, options: IMessageQuickOptions = {}) => {
  showMessage(Component, {
    ...options
  })
};
export default {
  success,
  warning,
  error,
  info,
  show,
};

type TMessagePosition = 'top' | 'center' | 'bottom';
type TMessageType = 'default' | 'success' | 'warning' | 'error' | 'info';
