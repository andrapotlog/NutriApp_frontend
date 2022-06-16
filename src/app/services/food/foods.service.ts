import { Injectable } from '@angular/core';
import { FoodsModel, MealDB, MealReport } from './foods.model';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UtilsService } from '../utils/utils.service';
import { utils } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class FoodsService {
  private url: string;
  readonly app_id: string = 'd38ccad8';
  readonly app_key: string = 'ae34e187515b1b7f05dd099c53c003b0';

  results: any[] = [];

  private urlRecipe: string;
  readonly app_idRecipe: string = '2ae5a608';
  readonly app_keyRecipe: string = '85e321f09145712349620af49bf0fb22';

  private foods: FoodsModel[] = [
    /*
    {
      id_food: '1',
      name: 'mar',
      category: 'idk',
      measure_label: 'grams',
      energ_kcal: 62,
      protein: 0.2,
      carbs: 14.8,
      fats: 0.2,
    },
    {
      id_food: '2',
      name: 'capsuni',
      category: 'idk',
      measure_label: 'grams',
      energ_kcal: 33,
      protein: 0.7,
      carbs: 8,
      fats: 0.3,
    },
    {
      id_food: '3',
      name: 'banane',
      category: 'idk',
      measure_label: 'grams',
      energ_kcal: 89,
      protein: 1.1,
      carbs: 23,
      fats: 0.3,
    },
  */
  ];

  constructor(private http: HttpClient, private utilService: UtilsService) {}

  getFoods() {
    return this.foods.slice();
  }

  getFoodByID(id: string): FoodsModel {
    let entry = {} as FoodsModel;

    this.foods.forEach((item) => {
      if (item.id_food === id) {
        entry = item;
      }
    });

    return entry;
  }

  addToDB(food: FoodsModel, grams: number, meal: string) {
    const check = this.getFoodByID(food.id_food);
    console.log(check);
    if (Object.keys(check).length === 0) {
      this.foods.push(food);
    }
    this.utilService.addToDB(food, grams, meal);

    console.log(this.foods);
  }

  getFoodDatabaseAPI(userSearch: string) {
    this.url =
      'https://api.edamam.com/api/food-database/v2/parser?' +
      '&app_id=' +
      this.app_id +
      '&app_key=' +
      this.app_key +
      '&ingr=' +
      userSearch;

    return this.http.get<any>(this.url).pipe(
      catchError((err) => {
        console.log('Connection Error: 401');
        console.log('Error caught in service');
        console.error(err);

        return throwError(err); //Rethrow it back to component
      })
    );
  }

  getRecipeAPI(userSearch: string, meal: string) {
    this.urlRecipe =
      'https://api.edamam.com/api/recipes/v2?type=public' +
      '&q=' +
      userSearch +
      '&app_id=' +
      this.app_idRecipe +
      '&app_key=' +
      this.app_keyRecipe +
      '&mealType=' +
      meal +
      '&random=true';

    return this.http.get<any>(this.urlRecipe).pipe(
      catchError((err) => {
        console.log('Error caught in service');
        console.error(err);

        return throwError(err); //Rethrow it back to component
      })
    );
  }

  setReport(reports: {
    dayReport: MealReport;
    breakfastReport: MealReport;
    lunchReport: MealReport;
    dinnerReport: MealReport;
    snacksReport: MealReport;
  }) {
    this.utilService.getEntryOfDay(new Date()).dayReport = reports.dayReport;
    this.utilService.getEntryOfDay(new Date()).breakfastReport =
      reports.breakfastReport;
    this.utilService.getEntryOfDay(new Date()).lunchReport =
      reports.lunchReport;
    this.utilService.getEntryOfDay(new Date()).dinnerReport =
      reports.dinnerReport;
    this.utilService.getEntryOfDay(new Date()).snacksReport =
      reports.snacksReport;
  }
}
