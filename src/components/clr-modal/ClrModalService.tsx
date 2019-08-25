import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import ClrModal, {IModalInjectProps} from "./ClrModal";
import ClrButton from "../clr-button/ClrButton";
import isUndefined from 'lodash/isUndefined';

export interface IModalOpenOptions {
  title?: string;
  data?: any;
  onComplete?: () => void;
}

export interface IModalAlertOpenOptions {
  title?: string;
  onOk?: (s: {
    close: () => void,
    setLoading: () => void;
    failBack: () => void;
  }) => void;
  onClose?: () => void;
  backgroundDismiss?: boolean;
  showClose?: boolean;
}
export interface IModalConfirmOpenOptions extends IModalAlertOpenOptions {
  onCancel?: () => void;
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
      {(modalProps: IModalInjectProps) => <Component {...modalProps} />}
    </ClrModal>
  ), container);
};

const alert = (message: string, options?: IModalAlertOpenOptions) => {
  if (isUndefined(options)) {
    options = {
      title: '提示',
      backgroundDismiss: true,
      showClose: true,
    };
  }
  if (isUndefined(options.backgroundDismiss)) {
    options.backgroundDismiss = true;
  }
  if (isUndefined(options.showClose)) {
    options.showClose = true;
  }
  const container = document.createElement('div');
  document.body.append(container);
  const close = () => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
    setTimeout(() => {
      options!.onClose && options!.onClose();
    }, 0);
  };

  ReactDOM.render((
    <ClrModal title={options.title} close={close}>
      {(modalProps: IModalInjectProps) => {
        const [loading, _showLoading] = useState(false);
        useEffect(() => {
          setTimeout(() => {
            modalProps.setBackgroundDismiss(options!.backgroundDismiss!);
            modalProps.setShowClose(options!.showClose!);
          }, 0);
          // eslint-disable-next-line
        }, []);

        function handleOkClick() {
          if (options!.onOk) {
            options!.onOk({
              close,
              setLoading: () => {
                modalProps.setBackgroundDismiss(false);
                modalProps.setShowClose(false);
                _showLoading(true);
              },
              failBack: () => {
                modalProps.setBackgroundDismiss(options!.backgroundDismiss!);
                modalProps.setShowClose(options!.showClose!);
                _showLoading(false);
              }
            });
          } else {
            close();
          }
        }

        return (
          <>
            <div className={"clr-modal-inner-content"}>
              <p>{message}</p>
            </div>
            <footer className={"clr-modal-inner-footer"}>
              <ClrButton loading={loading} type={"primary"}
                         onClick={handleOkClick}>确定</ClrButton>
            </footer>
          </>
        );
      }}
    </ClrModal>
  ), container);
};

const confirm = (message: string, options?: IModalConfirmOpenOptions) => {
  if (isUndefined(options)) {
    options = {};
  }
  if (isUndefined(options.title)) {
    options.title = '提示';
  }
  if (isUndefined(options.backgroundDismiss)) {
    options.backgroundDismiss = true;
  }
  if (isUndefined(options.showClose)) {
    options.showClose = true;
  }
  const container = document.createElement('div');
  document.body.append(container);
  const close = () => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
    setTimeout(() => {
      options!.onClose && options!.onClose();
    }, 0);
  };

  ReactDOM.render((
    <ClrModal title={options!.title} close={close}>
      {(modalProps: IModalInjectProps) => {
        const [loading, _showLoading] = useState(false);
        useEffect(() => {
          setTimeout(() => {
            modalProps.setBackgroundDismiss(options!.backgroundDismiss!);
            modalProps.setShowClose(options!.showClose!);
          }, 0);
          // eslint-disable-next-line
        }, []);

        function handleOkClick() {
          if (options!.onOk) {
            options!.onOk({
              close,
              setLoading: () => {
                modalProps.setBackgroundDismiss(false);
                modalProps.setShowClose(false);
                _showLoading(true);
              },
              failBack: () => {
                modalProps.setBackgroundDismiss(options!.backgroundDismiss!);
                modalProps.setShowClose(options!.showClose!);
                _showLoading(false);
              }
            });
          } else {
            close();
          }
        }
        function handleCancelClick() {
          close();
          if (options!.onCancel) {
            options!.onCancel();
          }
        }
        return (
          <>
            <div className={"clr-modal-inner-content"}>
              <p>{message}</p>
            </div>
            <footer className={"clr-modal-inner-footer"}>
              <ClrButton disabled={loading}
                         onClick={handleCancelClick}>取消</ClrButton>
              &nbsp;
              &nbsp;
              &nbsp;
              <ClrButton loading={loading} type={"primary"}
                         onClick={handleOkClick}>确定</ClrButton>
            </footer>
          </>
        );
      }}
    </ClrModal>
  ), container);
};

export default {
  openModal,
  alert,
  confirm,
}
