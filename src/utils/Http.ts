import Axios, {AxiosResponse} from 'axios'
import UserService from "../services/UserService";
import {history} from './Constant';
import ClrMessageService from "../components/clr-message/ClrMessageService";

// const baseURL = 'http://woddp.yxilin.com';
const baseURL = 'http://localhost:8000';
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
      ClrMessageService.warning(error.message);
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
  } else if (data.code !== 200) {
    err = _createError(new Error(data.msg));
  }
  return [typeof data === 'string' ? data : data.data, err, response];
}, error => {
  if (error.response && error.response.status) {
    // 跳到登录页
    history.replace('/login');
  }
  return [null, _createError(error), error.response]
});
// 纯 http 不带拦截器
export const pureHttp = Axios;
export default instance;
