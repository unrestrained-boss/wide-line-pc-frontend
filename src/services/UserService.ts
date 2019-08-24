import Http from '../utils/Http';
const loginUser = (body: any) => {
  return Http.post('/login', body)
};
const getUserToken = () => {
  return window.localStorage.getItem('token');
};
const setUserToken = (token: string) => {
  window.localStorage.setItem('token', token);
};
const logoutUser = () => {
  window.localStorage.clear();
};
export default {
  loginUser,
  getUserToken,
  setUserToken,
  logoutUser,
}
