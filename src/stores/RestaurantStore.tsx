import { observable, action, makeAutoObservable } from 'mobx';
import { OfferStore } from './OfferStore';
import { RootStoreModel } from './RootStore';
import { FoodStore } from './FoodStore';
import { ReserveStore } from './ReserveStore';

import { getRestaurants } from '../services/RestaurantServices';

export type RestaurantStoreModel = {
  offerStore: OfferStore;
  foodStore: FoodStore;
  reserveStore: ReserveStore;
};
export class RestaurantStore {
  private rootStore: RootStoreModel;
  offerStore: OfferStore;
  foodStore: FoodStore;
  reserveStore: ReserveStore;

  @observable restaurants: any;

  constructor(rootStore: RootStoreModel) {
    makeAutoObservable(this);
    this.offerStore = new OfferStore(this);
    this.foodStore = new FoodStore(this);
    this.reserveStore = new ReserveStore(this);
    this.rootStore = rootStore;
  }

  @action async getRestaurants() {
    this.restaurants = await getRestaurants();
    return this.restaurants;
  }
}
