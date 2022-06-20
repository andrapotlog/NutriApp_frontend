import { EventEmitter, Injectable, Output } from '@angular/core';
import { FoodsModel, MealDB, MealReport } from './foods.model';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root',
})
export class FoodsService {
  //food database
  private url: string;
  readonly app_id: string = 'd38ccad8';
  readonly app_key: string = 'ae34e187515b1b7f05dd099c53c003b0';

  //recipes
  private urlRecipe: string;
  readonly app_idRecipe: string = '2ae5a608';
  readonly app_keyRecipe: string = '85e321f09145712349620af49bf0fb22';

  private foods: FoodsModel[] = [];

  constructor(private http: HttpClient, private utilService: UtilsService) {
    this.getFoodsDatabase().subscribe((foods) => {
      this.foods = foods;
    });
  }

  getFoods() {
    return this.foods.slice();
  }

  getMealEntry(id_meal: number): Observable<MealDB[]> {
    const options = {
      params: { id_meal: id_meal },
    };

    return this.http.get<MealDB[]>(
      'http://localhost:8000/getMealEntry',
      options
    );
  }

  getFoodsDatabase(): Observable<FoodsModel[]> {
    return this.http.get<FoodsModel[]>('http://localhost:8000/getFoodDatabase');
  }

  addFoodToDatabase(food: FoodsModel) {
    const options = {
      params: food,
    };

    return this.http.post('http://localhost:8000/addFoodToDatabase', options, {
      responseType: 'text',
    });
  }

  addFoodToMealEntry(
    food: FoodsModel,
    grams: number,
    meal: string,
    date_entry: string,
    id_meal: number
  ) {
    const user = JSON.parse(localStorage.getItem('user')!);
    const options = {
      params: {
        id_meal: id_meal,
        id_food: food.id_food,
        portion: grams,
        date_entry: date_entry,
        id_user: user.uid,
        meal: meal,
      },
    };

    return this.http.post('http://localhost:8000/addFoodToMealEntry', options, {
      responseType: 'text',
    });
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

  addToDB(
    food: FoodsModel,
    grams: number,
    meal: string,
    id_meal: number,
    date: string
  ) {
    const check = this.getFoodByID(food.id_food);

    if (Object.keys(check).length === 0) {
      this.foods.push(food);
      this.addFoodToDatabase(food).subscribe((res) => console.log(res));
    }

    this.addFoodToMealEntry(food, grams, meal, date, id_meal).subscribe((res) =>
      console.log(JSON.parse(res))
    );
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
}
