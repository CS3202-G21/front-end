import { observable, action } from 'mobx';
import { RootStoreModel } from './RootStore';
import { getOffers } from '../services/RoomServices';

export class OfferStore {
  private rootStore: RootStoreModel;

  @observable offers: any;

  constructor(rootStore: RootStoreModel) {
    this.rootStore = rootStore;
  }

  @action getOffers() {
    this.offers = getOffers();
    console.log(this.offers);
  }
}
