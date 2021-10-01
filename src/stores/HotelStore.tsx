import { makeAutoObservable, reaction } from 'mobx';
import { RootStoreModel } from './RootStore';
import { RoomStore } from './RoomStore';
import { BookStore } from './BookStore';

export type HotelStoreModel = {
  roomStore: RoomStore;
  bookStore: BookStore;
};
export class HotelStore {
  private rootStore: RootStoreModel;
  roomStore: RoomStore;
  bookStore: BookStore;

  constructor(rootStore: RootStoreModel) {
    makeAutoObservable(this);
    this.roomStore = new RoomStore(this);
    this.bookStore = new BookStore(this);
    this.rootStore = rootStore;
  }
}
