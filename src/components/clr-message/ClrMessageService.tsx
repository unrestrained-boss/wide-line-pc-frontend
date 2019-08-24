import ReactDOM from "react-dom";
import React from "react";
import './ClrMessage.scss';

interface IMessageQuickOptions {
  time?: number;
}

interface IMessageOpenOptions extends IMessageQuickOptions {
  type?: TMessageType;
}

const container = document.createElement('div');
container.className = 'clr-message-container';
document.body.append(container);
const showMessage = (Component: any, options: IMessageOpenOptions = {}) => {
  const wrapper = document.createElement('div');
  container.append(wrapper);
  const close = () => {
    const el = wrapper.children[0] as HTMLDivElement;
    el.classList.add('out');
    el.addEventListener('animationend', () => {
      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(wrapper);
        wrapper.remove();
      }, 0);
    });
  };
  // const classNames = ['clr-message-wrapper'];
  // options!.position === 'center' && classNames.push('center');
  // options!.position === 'bottom' && classNames.push('bottom');
  const bodyClassNames = ['clr-message-body'];
  options!.type === 'success' && bodyClassNames.push('success');
  options!.type === 'warning' && bodyClassNames.push('warning');
  options!.type === 'error' && bodyClassNames.push('error');
  options!.type === 'info' && bodyClassNames.push('info');

  ReactDOM.render((
    <div className={bodyClassNames.join(' ')}>
      {Component}
    </div>
  ), wrapper);
  setTimeout(() => {
    close();
  }, options.time || 3000);
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

type TMessageType = 'default' | 'success' | 'warning' | 'error' | 'info';
