import { observable, action, makeAutoObservable } from 'mobx';
import { HotelStoreModel } from './HotelStore';
import { bookNow } from '../services/HotelServices';
import { getBookings } from '../services/HotelServices';
import { getTodayBookings } from '../services/HotelServices';
import { checkIn } from '../services/HotelServices';
import { checkOut } from '../services/HotelServices';
import { addReview } from '../services/HotelServices';
import { bookingPaymentCustomer } from '../services/HotelServices';
import { bookingPaymentStaff } from '../services/HotelServices';

export class BookStore {
  private hotelStore: HotelStoreModel;
  @observable startDate: any;
  @observable endDate: any;
  @observable roomDetails: any = window.localStorage.getItem('roomDetails')
    ? JSON.parse(window.localStorage.getItem('roomDetails') || '')
    : '';
  @observable bookingData: any;
  @observable receptionistCheckoutData: any;
  @observable errors: any;
  @observable inProgress: boolean = false;
  @observable getBookingData: any;
  @observable getTodayBookingData: any;

  constructor(hotelStore: HotelStoreModel) {
    makeAutoObservable(this);
    this.hotelStore = hotelStore;
  }
  @action setRoomDetails(roomDetails: any) {
    console.log('roomDetails', roomDetails);
    window.localStorage.setItem('roomDetails', JSON.stringify(roomDetails));
    this.roomDetails = roomDetails;
  }
  @action bookNow(
    room: any,
    customer: any,
    startDate: any,
    endDate: any,
    isCustomer: any
  ) {
    this.inProgress = true;
    console.log(room, customer, startDate, endDate, isCustomer);
    return bookNow(room, customer, startDate, endDate)
      .then((response) => {
        console.log(response);
        isCustomer
          ? (this.bookingData = response.room_reservation)
          : (this.receptionistCheckoutData = {
              reservation_id: response.room_reservation.id,
              customer: customer,
            });
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
  @action getTodayBookings() {
    return getTodayBookings()
      .then((response: any) => {
        this.getTodayBookingData = response.check_in_reservations;
        return 'success';
      })
      .catch(
        action((err: any) => {
          this.errors = Object.values(err.response.data)[0];
          return 'error';
        })
      );
  }
  @action checkIn(reservationId: any) {
    return checkIn(reservationId)
      .then((response: any) => {
        console.log(response);
        return 'success';
      })
      .catch(
        action((err: any) => {
          this.errors = Object.values(err.response.data)[0];
          return 'error';
        })
      );
  }
  @action checkOut(reservationId: any) {
    return checkOut(reservationId)
      .then((response: any) => {
        console.log(response);
        return 'success';
      })
      .catch(
        action((err: any) => {
          this.errors = Object.values(err.response.data)[0];
          return 'error';
        })
      );
  }
  @action addReview(reservationId: any, customerReview: any) {
    return addReview(reservationId, customerReview)
      .then((response: any) => {
        console.log(response);
        return 'success';
      })
      .catch(
        action((err: any) => {
          this.errors = Object.values(err.response.data)[0];
          return 'error';
        })
      );
  }
  @action payBooking(reservationId: any, type: any, customer?: any) {
    console.log(customer);
    if (type === 0) {
      console.log(reservationId);
      return bookingPaymentCustomer(reservationId)
        .then((response: any) => {
          console.log(response);
          return 'success';
        })
        .catch(
          action((err: any) => {
            this.errors = Object.values(err.response.data)[0];
            return 'error';
          })
        );
    }
    if (type === 2) {
      console.log(reservationId);
      return bookingPaymentStaff(reservationId, customer)
        .then((response: any) => {
          console.log(response);
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
}
