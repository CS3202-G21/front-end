import { AuthStore } from './AuthStore';
import { CommonStore } from './CommonStore';
import { UserStore } from './UserStore';
import { OfferStore } from './OfferStore';
import { useStore } from '../hooks/useStore';

export type RootStoreModel = {
  authStore: AuthStore;
  userStore: UserStore;
  commonStore: CommonStore;
  roomStore: OfferStore;
};

export class RootStore {
  authStore: AuthStore;
  userStore: UserStore;
  commonStore: CommonStore;
  roomStore: OfferStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
    this.roomStore = new OfferStore(this);
  }
}

export const rootStore: RootStoreModel = new RootStore();
