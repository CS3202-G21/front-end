import { observable, action } from "mobx";
import { RootStoreModel } from "./RootStore";
import { updateUser } from "../services/UserServices";
import { user } from "./AuthStore";

export interface IUserStore {
  currentUser?: any;
  loadingUser?: any;
  updatingUser?: any;
  updatingUserErrors?: any;
}

export class UserStore implements IUserStore {
  private rootStore: RootStoreModel;

  @observable currentUser: user | undefined;
  @observable loadingUser: boolean;
  @observable updatingUser: boolean;
  @observable updatingUserErrors: any;

  constructor(rootStore: RootStoreModel) {
    this.rootStore = rootStore;
    this.currentUser = undefined;
    this.loadingUser = false;
    this.updatingUser = false;
  }

  @action setUser(user: user) {
    this.currentUser = user;
  }

  @action updateUser(newUser: any) {
    this.updatingUser = true;
    return updateUser(newUser)
      .then(
        action((user: any) => {
          this.currentUser = user;
        })
      )
      .finally(
        action(() => {
          this.updatingUser = false;
        })
      );
  }

  @action forgetUser() {
    this.currentUser = undefined;
  }
}
