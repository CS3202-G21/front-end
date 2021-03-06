import { observable, action, makeAutoObservable, computed } from 'mobx';
import { RestaurantStoreModel } from './RestaurantStore';
import { reserveNow } from '../services/RestaurantServices';
import { getReservations } from '../services/RestaurantServices';
import { getTodayReservations } from '../services/RestaurantServices';
import { markArrival } from '../services/RestaurantServices';

export class ReserveStore {
  private restaurantStore: RestaurantStoreModel;
  @observable errors: any;
  @observable inProgress: boolean = false;
  @observable reserveData: any;
  @observable getReservationData: any;
  @observable getTodayReservationData: any;

  constructor(restaurantStore: RestaurantStoreModel) {
    makeAutoObservable(this);
    this.restaurantStore = restaurantStore;
  }
  @action reserveNow(
    restaurant: any,
    mealTime: any,
    reservedDate: any,
    numberOfPeople: any
  ) {
    this.inProgress = true;
    return reserveNow(restaurant, mealTime, reservedDate, numberOfPeople)
      .then((response) => {
        this.reserveData = response.table_reservation;
        console.log(this.reserveData);
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
  @action getReservations() {
    return getReservations()
      .then((response: any) => {
        this.getReservationData = response.table_reservations;
        return 'success';
      })
      .catch(
        action((err: any) => {
          this.errors = Object.values(err.response.data)[0];
          return 'error';
        })
      );
  }
  @action getTodayReservations() {
    return getTodayReservations()
      .then((response: any) => {
        this.getTodayReservationData = response.table_reservations;
        return 'success';
      })
      .catch(
        action((err: any) => {
          this.errors = Object.values(err.response.data)[0];
          return 'error';
        })
      );
  }
  @action markArrival(reservationId: any) {
    return markArrival(reservationId)
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
