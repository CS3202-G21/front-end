import { fetch } from '../fetch';

export const OFFERS_URL =
  'https://cloud-hotel.wimukthi.live/api/special_offers';
export const FOODS_URL = 'https://cloud-hotel.wimukthi.live/api/menu_items';
export const RESTAURANTS_URL =
  'https://cloud-hotel.wimukthi.live/api/restaurants';
export const GET_RESERVATIONS_URL =
  'https://cloud-hotel.wimukthi.live/api/table_reservations';
export const GET_TODAY_RESERVATIONS_URL =
  'https://cloud-hotel.wimukthi.live/api/table_reservations/today_reservations';
export const RESERVE_NOW_URL =
  'https://cloud-hotel.wimukthi.live/api/table_reservations';
export const MARK_ARRIVAL_URL =
  'https://cloud-hotel.wimukthi.live/api/table_reservations/arrival';

export const getOffers = async () => {
  return await fetch({
    method: 'get',
    url: OFFERS_URL,
  });
};

export const getFoods = async () => {
  return await fetch({
    method: 'get',
    url: FOODS_URL,
  });
};

export const getRestaurants = async () => {
  return await fetch({
    method: 'get',
    url: RESTAURANTS_URL,
  });
};

export const reserveNow = async (
  restaurant: any,
  mealTime: any,
  reservedDate: any,
  numberOfPeople: any
) => {
  const token = window.localStorage.getItem('jwt');
  return await fetch({
    method: 'post',
    headers: { Authorization: token ? `Token ${token}` : '' },
    url: RESERVE_NOW_URL,
    body: {
      restaurant: restaurant,
      meal_time: mealTime,
      reserved_date: reservedDate,
      num_of_people: numberOfPeople,
    },
  });
};

export const getReservations = async () => {
  const token = window.localStorage.getItem('jwt');
  return await fetch({
    method: 'get',
    headers: { Authorization: token ? `Token ${token}` : '' },
    url: GET_RESERVATIONS_URL,
  });
};

export const getTodayReservations = async () => {
  const token = window.localStorage.getItem('jwt');
  return await fetch({
    method: 'get',
    headers: { Authorization: token ? `Token ${token}` : '' },
    url: GET_TODAY_RESERVATIONS_URL,
  });
};

export const markArrival = async (reservationId: any) => {
  const token = window.localStorage.getItem('jwt');
  return await fetch({
    method: 'post',
    headers: { Authorization: token ? `Token ${token}` : '' },
    url: MARK_ARRIVAL_URL,
    body: {
      reservation_id: reservationId,
    },
  });
};
