import { observable, action } from "mobx";

export interface IAuthStore {
  email?: string;
  password?: string;
}

export class AuthStore implements IAuthStore {
  @observable email = "windy";
  @observable password = "pass";

  @action getName = (name: string): void => {};
}
