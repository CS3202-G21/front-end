import { observable, action, makeAutoObservable, computed } from 'mobx';
import { RestaurantStoreModel } from './RestaurantStore';
import { getFoods } from '../services/RestaurantServices';

export class FoodStore {
  private restaurantStore: RestaurantStoreModel;

  @observable foods: any;
  @observable filterFoods: any;

  constructor(restaurantStore: RestaurantStoreModel) {
    makeAutoObservable(this);
    this.restaurantStore = restaurantStore;
  }

  @action async getFoods() {
    this.foods = await getFoods();
    this.filterFoods = this.foods;
    return this.foods;
  }
  @computed getFilterFoods(type: any, restaurant: any) {
    if (type !== '' && restaurant !== '') {
      this.filterFoods = this.foods.filter(
        (food: any) => food.type === type && food.restaurant === restaurant
      );
    } else if (type !== '' && restaurant === '') {
      this.filterFoods = this.foods.filter((food: any) => food.type === type);
    } else if (type === '' && restaurant !== '') {
      this.filterFoods = this.foods.filter(
        (food: any) => food.restaurant === restaurant
      );
    } else if (type === '' && restaurant === '') {
    }
  }
}
