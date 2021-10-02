import { observable, action, makeAutoObservable } from 'mobx';
import { RootStoreModel } from './RootStore';
import { getUser, getUserById } from '../services/UserServices';
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
  @observable userById: any;
  @observable loadingUser: boolean;
  @observable updatingUser: boolean;
  @observable updatingUserErrors: any;
  @observable userClass: any =
    window.localStorage.getItem('userClass') &&
    JSON.parse(window.localStorage.getItem('userClass') || '');

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
  @action setUserClass(userClass: any) {
    localStorage.setItem('userClass', userClass);
    this.userClass = userClass;
  }

  @action async getUser() {
    this.currentUser = await getUser();
    return this.currentUser;
  }

  @action async getUserById(id: any) {
    await getUserById(id).then((res) => (this.userById = res.user));
    return this.userById;
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
    window.localStorage.removeItem('userClass');
    this.currentUser = undefined;
  }
}
