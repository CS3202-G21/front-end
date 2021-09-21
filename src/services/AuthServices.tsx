import { fetch } from '../fetch';

export const LOGIN_URL = 'http://localhost:8000/api/auth/customer/login';
export const REGISTER_URL = 'http://localhost:8000/api/auth/customer/register';

export const login = async (username: string, password: string) => {
  return await fetch({
    method: 'post',
    url: LOGIN_URL,
    body: { username: username, password: password },
  });
};

export const register = async (
  username: string,
  fName: string,
  lName: string,
  email: string,
  password: string
) => {
  return await fetch({
    method: 'post',
    url: REGISTER_URL,
    body: {
      username: username,
      first_name: fName,
      last_name: lName,
      email: email,
      password: password,
    },
  });
};
