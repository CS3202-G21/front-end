import { observable, action, makeAutoObservable } from 'mobx';
import { RestaurantStoreModel } from './RestaurantStore';
import { getOffers } from '../services/RestaurantServices';

export class OfferStore {
  private restaurantStore: RestaurantStoreModel;

  @observable offers: any;

  constructor(restaurantStore: RestaurantStoreModel) {
    makeAutoObservable(this);
    this.restaurantStore = restaurantStore;
  }

  @action async getOffers() {
    this.offers = await getOffers();
    return this.offers;
  }
}
