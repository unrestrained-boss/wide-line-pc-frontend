// @ts-ignore
import {create} from 'axios';

const instance = create({
  baseURL: 'http://woddp.yxilin.com',
  timeout: 0,
});

export default instance;
