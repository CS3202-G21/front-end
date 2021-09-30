import { fetch } from '../fetch';
import { useStore } from '../hooks/useStore';

export const GET_USER_URL =
  'http://178.128.121.215:8000/api/auth/customer/user';

export const getUser = async () => {
  const token = window.localStorage.getItem('jwt');
  return await fetch({
    headers: { Authorization: token ? `Token ${token}` : '' },
    method: 'get',
    url: GET_USER_URL,
  });
};
