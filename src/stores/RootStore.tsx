import { AuthStore } from "./AuthStore";
import { UserStore } from "./UserStore";

export type RootStoreModel = {
  authStore: AuthStore;
  userStore: UserStore;
};

export class RootStore {
  authStore: AuthStore;
  userStore: UserStore;

  constructor() {
    this.authStore = new AuthStore();
    this.userStore = new UserStore(this);
  }
}

export const rootStore: RootStoreModel = new RootStore();
