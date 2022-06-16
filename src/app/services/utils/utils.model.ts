import { MealDB, MealReport } from '../food/foods.model';

export interface UtilsModel {
  date: string;
  breakfastDB: MealDB[];
  lunchDB: MealDB[];
  dinnerDB: MealDB[];
  snacksDB: MealDB[];
  dayReport?: MealReport;
  breakfastReport?: MealReport;
  lunchReport?: MealReport;
  dinnerReport?: MealReport;
  snacksReport?: MealReport;
}
