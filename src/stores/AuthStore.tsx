import { observable, action } from 'mobx';
import { login } from '../services/AuthServices';
import { register } from '../services/AuthServices';
import { RootStoreModel } from './RootStore';

export interface IAuthStore {
  values: {
    username?: string;
    email?: string;
    password?: string;
  };
}

export type user = {
  id: number;
  username: string;
  email: string;
};

export class AuthStore implements IAuthStore {
  private rootStore: RootStoreModel;

  constructor(rootStore: RootStoreModel) {
    this.rootStore = rootStore;
  }
  @observable inProgress: boolean | undefined = false;
  @observable errors = undefined;

  @observable values = {
    username: '',
    email: '',
    password: '',
  };

  @action setUsername(username: string) {
    this.values.username = username;
  }

  @action setEmail(email: string) {
    this.values.email = email;
  }

  @action setPassword(password: string) {
    this.values.password = password;
  }

  @action reset() {
    this.values.username = 'k';
    this.values.email = '';
    this.values.password = '';
  }

  @action login() {
    this.inProgress = true;
    this.errors = undefined;
    return login(this.values.username, this.values.password)
      .then((response) => {
        console.log(response);
        this.rootStore.commonStore.setToken(response.token);
        this.rootStore.userStore.setUser(response.user);
        return 'success';
      })
      .catch(
        action((err: any) => {
          this.errors = err.response;
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
    return register(this.values.email, this.values.password)
      .then((user: any) => this.rootStore.commonStore.setToken(user.token))
      .catch(
        action((err: any) => {
          this.errors =
            err.response && err.response.body && err.response.body.errors;
          throw err;
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
