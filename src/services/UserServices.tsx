import { fetch } from "../fetch";

export const UPDATE_USER_URL = "http://localhost:8000/api/rooms";

export const updateUser = async (user: any) =>  {
    return await fetch({url: UPDATE_USER_URL, body: user});
}