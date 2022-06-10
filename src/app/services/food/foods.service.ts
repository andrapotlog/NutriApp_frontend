import { Injectable } from '@angular/core';
import { FoodsModel } from './foods.model';

@Injectable({
  providedIn: 'root',
})
export class FoodsService {
  private foods: FoodsModel[] = [
    {
      id_food: 1,
      name: 'mar',
      category: 'idk',
      measure_label: 'grams',
      energ_kcal: 62,
      protein: 0.2,
      carbs: 14.8,
      fats: 0.2,
    },
    {
      id_food: 2,
      name: 'capsuni',
      category: 'idk',
      measure_label: 'grams',
      energ_kcal: 33,
      protein: 0.7,
      carbs: 8,
      fats: 0.3,
    },
    {
      id_food: 3,
      name: 'banane',
      category: 'idk',
      measure_label: 'grams',
      energ_kcal: 89,
      protein: 1.1,
      carbs: 23,
      fats: 0.3,
    },
  ];

  constructor() {}

  getFoods() {
    return this.foods.slice();
  }
}
