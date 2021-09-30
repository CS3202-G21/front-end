import { AuthStore } from './AuthStore';
import { CommonStore } from './CommonStore';
import { UserStore } from './UserStore';
import { RestaurantStore } from './RestaurantStore';
import { HotelStore } from './HotelStore';

export type RootStoreModel = {
  authStore: AuthStore;
  userStore: UserStore;
  commonStore: CommonStore;
  restaurantStore: RestaurantStore;
  hotelStore: HotelStore;
};

export class RootStore {
  authStore: AuthStore;
  userStore: UserStore;
  commonStore: CommonStore;
  restaurantStore: RestaurantStore;
  hotelStore: HotelStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
    this.restaurantStore = new RestaurantStore(this);
    this.hotelStore = new HotelStore(this);
  }
}

export const rootStore: RootStoreModel = new RootStore();
