import { fetch } from '../fetch';

export const OFFERS_URL = 'http://178.128.121.215:8000/api/special_offers';
export const FOODS_URL = 'http://178.128.121.215:8000/api/menu_items';
export const RESTAURANTS_URL = 'http://178.128.121.215:8000/api/restaurants';

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
