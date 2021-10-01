import { fetch } from '../fetch';

export const OFFERS_URL = 'http://178.128.121.215:8000/api/special_offers';
export const FOODS_URL = 'http://178.128.121.215:8000/api/menu_items';
export const RESTAURANTS_URL = 'http://178.128.121.215:8000/api/restaurants';
export const GET_RESERVATIONS_URL =
  'http://178.128.121.215:8000/api/table_reservations';
export const RESERVE_NOW_URL =
  'http://178.128.121.215:8000/api/table_reservations';

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
