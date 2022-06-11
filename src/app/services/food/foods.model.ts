export interface FoodsModel {
  id_food: number;
  name: string;
  category: string;
  measure_label: string;
  energ_kcal: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface MealDB {
  id_food: number;
  portion: number;
}

export interface MealReport {
  total: number;
  proteins: number;
  fats: number;
  carbs: number;
}
