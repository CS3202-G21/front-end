import { observable, action, makeAutoObservable } from 'mobx';
import { HotelStoreModel } from './HotelStore';
import { bookNow } from '../services/HotelServices';
import { getBookings } from '../services/HotelServices';

export class BookStore {
  private hotelStore: HotelStoreModel;
  @observable startDate: any;
  @observable endDate: any;
  @observable roomDetails: any = window.localStorage.getItem('roomDetails')
    ? JSON.parse(window.localStorage.getItem('roomDetails') || '')
    : '';
  @observable bookingData: any;
  @observable errors: any;
  @observable inProgress: boolean = false;
  @observable getBookingData: any;

  constructor(hotelStore: HotelStoreModel) {
    makeAutoObservable(this);
    this.hotelStore = hotelStore;
  }
  @action setRoomDetails(roomDetails: any) {
    console.log('roomDetails', roomDetails);
    window.localStorage.setItem('roomDetails', JSON.stringify(roomDetails));
    this.roomDetails = roomDetails;
  }
  @action bookNow(room: any, customer: any, startDate: any, endDate: any) {
    this.inProgress = true;
    return bookNow(room, customer, startDate, endDate)
      .then((response) => {
        this.bookingData = response.room_reservation;
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
  @action getBookings() {
    return getBookings()
      .then((response: any) => {
        this.getBookingData = response.room_reservations;
        return 'success';
      })
      .catch(
        action((err: any) => {
          this.errors = Object.values(err.response.data)[0];
          return 'error';
        })
      );
  }
}
