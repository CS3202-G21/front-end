import { fetch } from "../fetch";

export const LOGIN_URL = "http://localhost:8000/api/auth/customer/login";
export const REGISTER_URL = "http://localhost:8000/api/rooms";

export const login = async (username: string, password: string) => {
  return await fetch({
    method: "post",
    url: LOGIN_URL,
    body: { username: username, password: password },
  });
};

export const register = async (email: string, password: string) => {
  return await fetch({
    url: REGISTER_URL,
    body: { email: email, password: password },
  });
};
