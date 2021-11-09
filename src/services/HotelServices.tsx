import { fetch } from '../fetch';

export const ROOMS_URL = 'https://cloud-hotel.wimukthi.live/api/rooms';
export const ROOM_INFO_URL = 'https://cloud-hotel.wimukthi.live/api/room_types';
export const BOOK_NOW_URL =
  'https://cloud-hotel.wimukthi.live/api/room_reservations';
export const GET_BOOKINGS_URL =
  'https://cloud-hotel.wimukthi.live/api/room_reservations';
export const GET_REVIEWS_URL =
  'https://cloud-hotel.wimukthi.live/api/room_reservations/get_reviews';
export const GET_TODAY_BOOKINGS_URL =
  'https://cloud-hotel.wimukthi.live/api/room_reservations/today_reservations';
export const CHECK_IN_URL =
  'https://cloud-hotel.wimukthi.live/api/room_reservations/check_in';
export const CHECK_OUT_URL =
  'https://cloud-hotel.wimukthi.live/api/room_reservations/check_out';
export const ADD_REVIEW_URL =
  'https://cloud-hotel.wimukthi.live/api/room_reservations/add_review';
export const BOOKING_PAYMENT_URL =
  'https://cloud-hotel.wimukthi.live/api/room_reservations/payment_success';

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
export const getTodayBookings = async () => {
  const token = window.localStorage.getItem('jwt');
  return await fetch({
    method: 'get',
    headers: { Authorization: token ? `Token ${token}` : '' },
    url: GET_TODAY_BOOKINGS_URL,
  });
};
export const checkIn = async (reservationId: any) => {
  const token = window.localStorage.getItem('jwt');
  return await fetch({
    method: 'post',
    headers: { Authorization: token ? `Token ${token}` : '' },
    url: CHECK_IN_URL,
    body: {
      reservation_id: reservationId,
    },
  });
};
export const checkOut = async (reservationId: any) => {
  const token = window.localStorage.getItem('jwt');
  return await fetch({
    method: 'post',
    headers: { Authorization: token ? `Token ${token}` : '' },
    url: CHECK_OUT_URL,
    body: {
      reservation_id: reservationId,
    },
  });
};

export const addReview = async (reservationId: any, customerReview: any) => {
  const token = window.localStorage.getItem('jwt');
  return await fetch({
    method: 'post',
    headers: { Authorization: token ? `Token ${token}` : '' },
    url: ADD_REVIEW_URL,
    body: {
      reservation_id: reservationId,
      customer_review: customerReview,
    },
  });
};

export const bookingPaymentStaff = async (
  reservationId: any,
  username: any
) => {
  const token = window.localStorage.getItem('jwt');
  return await fetch({
    method: 'post',
    headers: { Authorization: token ? `Token ${token}` : '' },
    url: BOOKING_PAYMENT_URL,
    body: {
      reservation_id: reservationId,
      customer: username,
    },
  });
};

export const bookingPaymentCustomer = async (reservationId: any) => {
  console.log(reservationId);
  const token = window.localStorage.getItem('jwt');
  return await fetch({
    method: 'post',
    headers: { Authorization: token ? `Token ${token}` : '' },
    url: BOOKING_PAYMENT_URL,
    body: {
      reservation_id: reservationId,
    },
  });
};
export const getReviews = async () => {
  const token = window.localStorage.getItem('jwt');
  return await fetch({
    method: 'get',
    headers: { Authorization: token ? `Token ${token}` : '' },
    url: GET_REVIEWS_URL,
  });
};
