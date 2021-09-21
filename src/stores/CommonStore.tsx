import { observable, action, makeAutoObservable } from 'mobx';
import { RootStoreModel } from './RootStore';

export type token = string | null | undefined;

export class CommonStore {
  private rootStore: RootStoreModel;

  @observable appName = 'Cloud Hotel';
  @observable token: token = window.localStorage.getItem('jwt');
  @observable isAuthenticated: boolean;
  @observable appLoaded = false;

  @observable tags = [];
  @observable isLoadingTags = false;

  constructor(rootStore: RootStoreModel) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    if (this.token) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }

  @action setToken(token: token) {
    if (token) {
      this.token = token;
      this.isAuthenticated = true;
      window.localStorage.setItem('jwt', token!);
    } else {
      window.localStorage.removeItem('jwt');
    }
  }

  @action setAppLoaded() {
    this.appLoaded = true;
  }
}
