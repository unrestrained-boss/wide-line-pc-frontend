import Axios, {AxiosResponse} from 'axios'
import UserService from "../services/UserService";
import { history } from './Constant';
import qs from 'qs';

const baseURL = 'http://woddp.yxilin.com';
const instance = Axios.create({
  baseURL,
  timeout: 10000,
  transformRequest: [function (data) {
    data = qs.stringify(data);
    return data;
  }],
});

export interface BeforeResponse {
  data: any;
  code: number;
  msg: string;
}


instance.interceptors.request.use(config => {
  const token = UserService.getUserToken();
  if (token) {
    config.headers["token"] = UserService.getUserToken();
  }
  return config;
});
instance.interceptors.response.use((response: AxiosResponse<BeforeResponse>): any => {
  const {data} = response;
  if (data.code !== 200) {
    return [null, new Error(data.msg), response];
  }
  return [data.data, null, response];
}, error => {
  if (error.response && error.response.status) {
    // 跳到登录页
    history.replace('/login');
  }
  return [null, error, error.response]
});
// 纯 http 不带拦截器
export const pureHttp = Axios;
export default instance;
