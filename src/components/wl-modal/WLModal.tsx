import ReactDOM from "react-dom";
import React, {useState} from "react";
import {Button, Icon, Modal} from "antd";
import './WLModal.scss';
import zhCN from 'antd/es/locale/zh_CN';
import {ConfigProvider} from "antd";

export interface IWLModalOpenOptions {
  title?: string;
  defaultCanDismiss?: boolean;
  defaultClosable?: boolean;
  data?: any;
  width?: number | string;
  onComplete?: () => void;
}
export interface IWLAlertModalOpenOptions {
  title?: string;
  onOk?: (s: {
    close: () => void,
    setLoading: () => void;
    failBack: () => void;
  }) => void;
  defaultCanDismiss?: boolean;
  defaultClosable?: boolean;
}
export interface IWLConfirmModalOpenOptions extends IWLAlertModalOpenOptions {
  onCancel?: () => void;
}

export interface IWLModalInjectProps {
  close: () => void;
  setCanDismiss: (s: boolean) => void;
  setCanClosable: (s: boolean) => void;
  getPreData: <T>() => T;
  onComplete?: () => void;
}

function openModal(Component: any, options: IWLModalOpenOptions = {}) {
  const container = document.createElement('div');
  const {defaultClosable = true, defaultCanDismiss = true} = options;
  // document.body.append(container);
  const clearDom = () => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
  };

  function WrapModal() {
    const [visible, setVisible] = useState(defaultClosable);
    const [canClosable, setCanClosable] = useState(defaultClosable);
    const [canDismiss, setCanDismiss] = useState(defaultCanDismiss);
    const injectProps: IWLModalInjectProps = {
      close: () => setVisible(false),
      setCanDismiss,
      setCanClosable,
      getPreData: () => options.data,
      onComplete: options.onComplete ? options.onComplete : () => {
      },
    };
    return (
      <ConfigProvider locale={zhCN}>
        <Modal className={"wl-modal"}
               title={options.title || <span>&nbsp;</span>}
               width={options.width}
               destroyOnClose
               afterClose={() => {
                 clearDom();
               }}
               closable={canClosable}
               maskClosable={canDismiss}
               keyboard={canDismiss}
               onCancel={() => setVisible(false)}
               onOk={() => setVisible(false)}
               visible={visible}
               centered={false}
               footer={null}>
          <Component {...injectProps} />
        </Modal>
      </ConfigProvider>
    );
  }

  ReactDOM.render(<WrapModal/>, container);
}


function alert(Component: any, options: IWLAlertModalOpenOptions = {}) {
  const container = document.createElement('div');
  const {defaultClosable = true, defaultCanDismiss = true} = options;
  const clearDom = () => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
  };

  function WrapModal() {
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(true);
    const [canClosable, setCanClosable] = useState(defaultClosable);
    const [canDismiss, setCanDismiss] = useState(defaultCanDismiss);

    function handleOk() {
      if (options!.onOk) {
        options!.onOk({
          close: () => setVisible(false),
          setLoading: () => {
            setCanClosable(false);
            setCanDismiss(false);
            setLoading(true);
          },
          failBack: () => {
            setCanClosable(true);
            setCanDismiss(true);
            setLoading(false);
          }
        });
      } else {
        setVisible(false);
      }
    }
    //
    // function handleCancel() {
    //   setVisible(false);
    // }

    return (
      <ConfigProvider locale={zhCN}>
        <Modal className={"wl-modal"}
               title={getTitle(options.title!, "info-circle")}
               destroyOnClose
               afterClose={() => {
                 clearDom();
               }}
               footer={[
                 <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                   确定
                 </Button>
               ]}
               closable={canClosable}
               maskClosable={canDismiss}
               keyboard={canDismiss}
               visible={visible}
               centered>
          {Component}
        </Modal>
      </ConfigProvider>
    );
  }

  ReactDOM.render(<WrapModal/>, container);
}

function confirm(Component: any, options: IWLConfirmModalOpenOptions = {}) {
  const container = document.createElement('div');
  const {defaultClosable = true, defaultCanDismiss = true} = options;
  const clearDom = () => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
  };

  function WrapModal() {
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(true);
    const [canClosable, setCanClosable] = useState(defaultClosable);
    const [canDismiss, setCanDismiss] = useState(defaultCanDismiss);
    function handleOk() {
      if (options!.onOk) {
        options!.onOk({
          close: () => setVisible(false),
          setLoading: () => {
            setCanClosable(false);
            setCanDismiss(false);
            setLoading(true);
          },
          failBack: () => {
            setCanClosable(true);
            setCanDismiss(true);
            setLoading(false);
          }
        });
      } else {
        setVisible(false);
      }
    }

    function handleCancel() {
      setVisible(false);
    }

    return (
      <ConfigProvider locale={zhCN}>
        <Modal className={"wl-modal"}
               title={getTitle(options.title!)}
               destroyOnClose
               afterClose={() => {
                 clearDom();
               }}
               closable={canClosable}
               maskClosable={canDismiss}
               keyboard={canDismiss}
               onCancel={handleCancel}
               onOk={handleOk}
               cancelButtonProps={{disabled: loading}}
               okButtonProps={{loading}}
               visible={visible}
               centered>
          {Component}
        </Modal>
      </ConfigProvider>
    );
  }

  ReactDOM.render(<WrapModal/>, container);
}

const WLModal = {
  openModal,
  confirm,
  alert,
};

export default WLModal;

function getTitle(title: string, iconType = 'question-circle') {
  return (
    <h3>
      <Icon className={"title-icon"} type={iconType} />
      <span style={{marginLeft: '10px'}}>{title || '提示'}</span>
    </h3>
  );

}
