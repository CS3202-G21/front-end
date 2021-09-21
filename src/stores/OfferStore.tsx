import { observable, action, makeAutoObservable } from 'mobx';
import { RootStoreModel } from './RootStore';
import { getOffers } from '../services/RoomServices';

export class OfferStore {
  private rootStore: RootStoreModel;

  @observable offers: any;

  constructor(rootStore: RootStoreModel) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  @action async getOffers() {
    this.offers = await getOffers();
    return this.offers;
  }
}
