import { fetch } from '../fetch';

export const OFFERS_URL = 'http://localhost:8000/api/special_offers/1';

export const getOffers = async () => {
  return await fetch({
    method: 'get',
    url: OFFERS_URL,
  });
};
