import { fetch } from '../fetch';
import { useStore } from '../hooks/useStore';

export const GET_USER_URL =
  'https://cloud-hotel.wimukthi.live/api/auth/customer/user';

export const getUser = async () => {
  const token = window.localStorage.getItem('jwt');
  return await fetch({
    headers: { Authorization: token ? `Token ${token}` : '' },
    method: 'get',
    url: GET_USER_URL,
  });
};

export const getUserById = async (user_id: any) => {
  const token = window.localStorage.getItem('jwt');
  return await fetch({
    headers: { Authorization: token ? `Token ${token}` : '' },
    method: 'get',
    url: `https://cloud-hotel.wimukthi.live/api/customer/user_info/${user_id}`,
  });
};
