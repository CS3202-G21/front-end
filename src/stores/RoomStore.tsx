import { observable, action, makeAutoObservable, computed } from 'mobx';
import { HotelStoreModel } from './HotelStore';
import { getRooms } from '../services/HotelServices';
import { getRoomInfo } from '../services/HotelServices';
import { getReviews } from '../services/HotelServices';

export class RoomStore {
  private hotelStore: HotelStoreModel;
  @observable rooms: any;
  @observable roomInfo: any;
  @observable roomTypes: any = [];
  @observable filterRooms: any;
  @observable reviews: any;
  @observable roomInfoById: any;

  constructor(hotelStore: HotelStoreModel) {
    makeAutoObservable(this);
    this.hotelStore = hotelStore;
  }

  @action async getRooms() {
    this.rooms = await getRooms();
    this.filterRooms = this.rooms;
    return this.rooms;
  }

  @action async getRoomInfo() {
    this.roomInfo = await getRoomInfo();
    return this.roomInfo;
  }

  @computed getRoomTypes() {
    if (this.roomTypes.length === 0) {
      this.roomInfo.map((room: any) =>
        this.roomTypes.push({ id: room.id, type: room.title })
      );
    }
  }
  @computed getRoomInfoById(id: any) {
    this.roomInfoById = this.roomInfo.filter(
      (info: any) =>
        info.id === this.rooms.filter((r: any) => r.id === id)[0].type
    )[0];
    return this.roomInfoById;
  }

  @action getReviews() {
    getReviews().then((res) => (this.reviews = res.reviews));
    return this.reviews;
  }

  @computed getFilterRooms(roomType: any, price: any) {
    console.log('props', roomType, price);
    if (roomType !== '' && price !== undefined) {
      this.filterRooms = this.rooms.filter(
        (room: any) =>
          room.type === roomType &&
          parseInt(price.minPrice) <
            parseInt(
              this.roomInfo.filter(
                (roomInfo: any) => roomInfo.id === room.type
              )[0].price
            ) &&
          parseInt(
            this.roomInfo.filter(
              (roomInfo: any) => roomInfo.id === room.type
            )[0].price
          ) <= parseInt(price.maxPrice)
      );
      console.log(this.filterRooms);
    } else if (roomType !== '' && price === undefined) {
      this.filterRooms = this.rooms.filter(
        (room: any) => room.type === roomType
      );
    } else if (roomType === '' && price !== undefined) {
      this.filterRooms = this.rooms.filter(
        (room: any) =>
          parseInt(price.minPrice) <
            parseInt(
              this.roomInfo.filter(
                (roomInfo: any) => roomInfo.id === room.type
              )[0].price
            ) &&
          parseInt(
            this.roomInfo.filter(
              (roomInfo: any) => roomInfo.id === room.type
            )[0].price
          ) <= parseInt(price.maxPrice)
      );
    } else if (roomType === '' && price === undefined) {
    }
  }
}
