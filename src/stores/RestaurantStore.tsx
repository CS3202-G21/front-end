import { observable, action, makeAutoObservable } from 'mobx';
import { OfferStore } from './OfferStore';
import { RootStoreModel } from './RootStore';
import { FoodStore } from './FoodStore';
import { getRestaurants } from '../services/RestaurantServices';

export type RestaurantStoreModel = {
  offerStore: OfferStore;
  foodStore: FoodStore;
};
export class RestaurantStore {
  private rootStore: RootStoreModel;
  offerStore: OfferStore;
  foodStore: FoodStore;

  @observable restaurants: any;

  constructor(rootStore: RootStoreModel) {
    makeAutoObservable(this);
    this.offerStore = new OfferStore(this);
    this.foodStore = new FoodStore(this);
    this.rootStore = rootStore;
  }

  @action async getRestaurants() {
    this.restaurants = await getRestaurants();
    return this.restaurants;
  }
}
