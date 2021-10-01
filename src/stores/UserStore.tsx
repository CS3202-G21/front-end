import { observable, action, makeAutoObservable } from 'mobx';
import { RootStoreModel } from './RootStore';
import { getUser } from '../services/UserServices';
import { user } from './AuthStore';

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
  @observable userClass: any;

  constructor(rootStore: RootStoreModel) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.loadingUser = false;
    this.updatingUser = false;
  }

  @action setUser(user: user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser = user;
  }
  @action setUserClass(userClass: user) {
    localStorage.setItem('userClass', JSON.stringify(userClass));
    this.userClass = userClass;
  }

  @action async getUser() {
    this.currentUser = await getUser();
    return this.currentUser;
  }

  // @action updateUser(newUser: any) {
  //   this.updatingUser = true;
  //   return updateUser(newUser)
  //     .then(
  //       action((user: any) => {
  //         this.currentUser = user;
  //       })
  //     )
  //     .finally(
  //       action(() => {
  //         this.updatingUser = false;
  //       })
  //     );
  // }

  @action forgetUser() {
    window.localStorage.removeItem('currentUser');
    this.currentUser = undefined;
  }
}
