import { AuthStore } from './AuthStore';
import { CommonStore } from './CommonStore';
import { UserStore } from './UserStore';
import { OfferStore } from './OfferStore';

export type RootStoreModel = {
  authStore: AuthStore;
  userStore: UserStore;
  commonStore: CommonStore;
  offerStore: OfferStore;
};

export class RootStore {
  authStore: AuthStore;
  userStore: UserStore;
  commonStore: CommonStore;
  offerStore: OfferStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
    this.offerStore = new OfferStore(this);
  }
}

export const rootStore: RootStoreModel = new RootStore();
