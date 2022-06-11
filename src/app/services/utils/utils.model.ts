import { MealDB } from '../food/foods.model';

export interface UtilsModel {
  date: string;
  breakfastDB: MealDB[];
  lunchDB: MealDB[];
  dinnerDB: MealDB[];
  snacksDB: MealDB[];
}
