import { fetch } from '../fetch';

export const ROOMS_URL = 'http://178.128.121.215:8000/api/rooms';
export const ROOM_INFO_URL = 'http://178.128.121.215:8000/api/room_types';
export const BOOK_NOW_URL = 'http://178.128.121.215:8000/api/room_reservations';
export const GET_BOOKINGS_URL =
  'http://178.128.121.215:8000/api/room_reservations';

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
export const bookNow = async (
  room: any,
  customer: any,
  start_date: any,
  end_date: any
) => {
  const token = window.localStorage.getItem('jwt');
  return await fetch({
    method: 'post',
    headers: { Authorization: token ? `Token ${token}` : '' },
    url: BOOK_NOW_URL,
    body: {
      room: room,
      customer: customer,
      start_date: start_date,
      end_date: end_date,
    },
  });
};
export const getBookings = async () => {
  const token = window.localStorage.getItem('jwt');
  return await fetch({
    method: 'get',
    headers: { Authorization: token ? `Token ${token}` : '' },
    url: GET_BOOKINGS_URL,
  });
};
