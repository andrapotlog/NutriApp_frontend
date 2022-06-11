import { Injectable } from '@angular/core';
import { UtilsModel } from './utils.model';
import { MealDB } from '../food/foods.model';
import { UsersService } from '../user/users.service';
import { UserModel } from '../user/user.model';

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
      breakfastDB: [
        {
          id_food: 1,
          portion: 200,
        },
        {
          id_food: 2,
          portion: 50,
        },
      ],
      lunchDB: [],
      dinnerDB: [],
      snacksDB: [],
    },
  ];

  constructor() {}

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
