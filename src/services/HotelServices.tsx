import { fetch } from '../fetch';

export const ROOMS_URL = 'http://178.128.121.215:8000/api/rooms';
export const ROOM_INFO_URL = 'http://178.128.121.215:8000/api/room_types';

export const getRooms = async () => {
  return await fetch({
    method: 'get',
    url: ROOMS_URL,
  });
};
export const getRoomInfo = async () => {
  return await fetch({
    method: 'get',
    url: ROOM_INFO_URL,
  });
};
