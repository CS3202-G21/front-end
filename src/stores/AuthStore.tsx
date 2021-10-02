import { observable, action, makeAutoObservable } from 'mobx';
import { login } from '../services/AuthServices';
import { register } from '../services/AuthServices';
import { RootStoreModel } from './RootStore';
import { staffLogin } from '../services/AuthServices';

export interface IAuthStore {
  values: {
    username?: string;
    fName?: string;
    lName?: string;
    email?: string;
    password?: string;
  };
}

export type user = {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
};

export class AuthStore implements IAuthStore {
  private rootStore: RootStoreModel;

  constructor(rootStore: RootStoreModel) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }
  @observable inProgress: boolean | undefined = false;
  @observable errors: any = undefined;

  @observable values = {
    username: '',
    fName: '',
    lName: '',
    email: '',
    password: '',
  };

  @action setUsername(username: string) {
    this.values.username = username;
  }

  @action setFName(fName: string) {
    this.values.fName = fName;
  }

  @action setLName(lName: string) {
    this.values.lName = lName;
  }

  @action setEmail(email: string) {
    this.values.email = email;
  }

  @action setPassword(password: string) {
    this.values.password = password;
  }

  @action reset() {
    this.values.username = 'k';
    this.values.fName = '';
    this.values.lName = '';
    this.values.email = '';
    this.values.password = '';
  }

  @action login() {
    this.inProgress = true;
    this.errors = undefined;
    return login(this.values.username, this.values.password)
      .then((response) => {
        this.rootStore.commonStore.setToken(response.token);
        this.rootStore.userStore.setUser(response.user);
        this.rootStore.userStore.setUserClass(0);
        return 'success';
      })
      .catch(
        action((err: any) => {
          this.errors = Object.values(err.response.data)[0];
          return 'error';
        })
      )
      .finally(
        action(() => {
          this.inProgress = false;
        })
      );
  }
  @action staffLogin() {
    this.inProgress = true;
    this.errors = undefined;
    return staffLogin(this.values.username, this.values.password)
      .then((response) => {
        this.rootStore.commonStore.setToken(response.token);
        this.rootStore.userStore.setUser(response.user);
        this.rootStore.userStore.setUserClass(response.user_class);
        return 'success';
      })
      .catch(
        action((err: any) => {
          this.errors = Object.values(err.response.data)[0];
          return 'error';
        })
      )
      .finally(
        action(() => {
          this.inProgress = false;
        })
      );
  }

  @action register() {
    this.inProgress = true;
    this.errors = undefined;
    return register(
      this.values.username,
      this.values.fName,
      this.values.lName,
      this.values.email,
      this.values.password
    )
      .then((response) => {
        console.log(response);
        this.rootStore.commonStore.setToken(response.token);
        this.rootStore.userStore.setUser(response.user);
        this.rootStore.userStore.setUserClass(0);
        return 'success';
      })
      .catch(
        action((err: any) => {
          this.errors = Object.values(err.response.data)[0];
          return 'error';
        })
      )
      .finally(
        action(() => {
          this.inProgress = false;
        })
      );
  }

  @action logout() {
    this.rootStore.commonStore.setToken(undefined);
    this.rootStore.userStore.forgetUser();
    this.rootStore.commonStore.isAuthenticated = false;
    return Promise.resolve();
  }
}
