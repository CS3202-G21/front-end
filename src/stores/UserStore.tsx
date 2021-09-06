import { observable, action } from "mobx";
import { RootStoreModel } from "./RootStore";

export interface IUserStore {
  name?: string;
  pic?: string;
}

export class UserStore implements IUserStore {
  private rootStore: RootStoreModel;

  @observable name = "";
  @observable pic = "";

  constructor(rootStore: RootStoreModel) {
    this.rootStore = rootStore;
  }

  @action getName = (name: string): void => {
    if (this.rootStore.authStore.email) {
      this.name = name;
    }
  };

  @action getProfilePic = (pic: string): void => {
    if (this.rootStore.authStore.email) {
      this.pic = pic;
    }
  };
}
