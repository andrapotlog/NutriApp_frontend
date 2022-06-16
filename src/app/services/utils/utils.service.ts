import { Injectable } from '@angular/core';
import { UtilsModel } from './utils.model';
import { FoodsModel, MealDB, MealReport } from '../food/foods.model';
import { UsersService } from '../user/users.service';
import { UserModel } from '../user/user.model';
import { Subject } from 'rxjs';
import { FoodsService } from '../food/foods.service';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private date = new Date('2022-06-11');
  private nowDate = this.getDateAsString(new Date());

  private lunchDB: MealDB[] = [];

  private calendar: UtilsModel[] = [
    {
      date: this.nowDate,
      breakfastDB: [],
      lunchDB: [],
      dinnerDB: [],
      snacksDB: [],
    },
  ];

  constructor() {}

  addToDB(food: FoodsModel, grams: number, meal: string) {
    if (meal === 'breakfast') {
      this.getEntryOfDay(new Date()).breakfastDB.push({
        id_food: food.id_food,
        portion: grams,
      });
    } else if (meal === 'lunch') {
      this.getEntryOfDay(new Date()).lunchDB.push({
        id_food: food.id_food,
        portion: grams,
      });
    } else if (meal === 'dinner') {
      this.getEntryOfDay(new Date()).dinnerDB.push({
        id_food: food.id_food,
        portion: grams,
      });
    } else {
      this.getEntryOfDay(new Date()).snacksDB.push({
        id_food: food.id_food,
        portion: grams,
      });
      console.log(this.calendar);
    }
  }

  getCalendar() {
    return this.calendar.slice();
  }

  getDateAsString(date: Date) {
    return (
      date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
    );
  }

  getEntryOfDay(date: Date): UtilsModel {
    let entry = {} as UtilsModel;

    this.calendar.forEach((item) => {
      if (item.date === this.getDateAsString(date)) {
        entry = item;
      }
    });

    return entry;
  }
}
