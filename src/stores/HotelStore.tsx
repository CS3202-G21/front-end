import { makeAutoObservable } from 'mobx';
import { RootStoreModel } from './RootStore';
import { RoomStore } from './RoomStore';

export type HotelStoreModel = {
  roomStore: RoomStore;
};
export class HotelStore {
  private rootStore: RootStoreModel;
  roomStore: RoomStore;

  constructor(rootStore: RootStoreModel) {
    makeAutoObservable(this);
    this.roomStore = new RoomStore(this);
    this.rootStore = rootStore;
  }
}
