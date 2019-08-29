import Axios, {AxiosResponse} from 'axios'
import UserService from "../services/UserService";
// import {history} from './Constant';
import {message} from "antd";
import WLModal from "../components/wl-modal/WLModal";
// import ClrMessageService from "../components/clr-message/ClrMessageService";
// import ClrModalService from "../components/clr-modal/ClrModalService";

const baseURL = process.env.REACT_APP_API_BASE_URL;
const instance = Axios.create({
  baseURL,
  timeout: 10000,
});

export interface BeforeResponse {
  data: any;
  code: number;
  msg: string;
}

export interface ResponseError extends Error {
  showMessage: () => void;
}

function _createError(error: Error): ResponseError {
  return {
    showMessage: () => {
      message.warning(error.message);
    },
    message: error.message,
    stack: error.stack,
    name: error.name,
  };
}

instance.interceptors.request.use(config => {
  const token = UserService.getUserToken();
  if (token) {
    config.headers["X-Token"] = UserService.getUserToken();
  }
  return config;
});
instance.interceptors.response.use((response: AxiosResponse<BeforeResponse | string>): any => {
  const {data} = response;
  let err: ResponseError | null = null;
  if (typeof data === 'string') {
    err = _createError(new Error(data));
  } else if (data.code === 600) {
    WLModal.alert('登录信息已过期, 请重新登录', {
      defaultCanDismiss: false,
      defaultClosable: false,
      onOk() {
        UserService.logoutUser();
        // 跳到登录页
        // history.replace('/login');
        window.location.href = process.env.REACT_APP_BASE_URL as string;
      }
    });
    err = _createError(new Error(data.msg));
  } else if (data.code !== 200) {
    err = _createError(new Error(data.msg));
  }
  return [typeof data === 'string' ? data : data.data, err, response];
}, error => {
  // console.log(error, 111)
  // if (error.response && error.response.data.code === 600) {
  //   WLModal.alert('登录信息已过期, 请重新登录', {
  //     backgroundDismiss: false,
  //     showClose: false,
  //     onOk() {
  //       // UserService.logoutUser();
  //       // 跳到登录页
  //       // history.replace('/login');
  //       // window.location.reload();
  //     }
  //   })
  // }
  return [null, _createError(error), error.response]
});
// 纯 http 不带拦截器
export const pureHttp = Axios;
export default instance;
