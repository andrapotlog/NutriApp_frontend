export interface UserModel {
  id_user: number;
  email: string;
  first_name: string;
  last_name: string;
  created_at: Date;
  birthdate: Date;
  gender: Gender;
  height: number;
  weight: number;
  goal: Goal;
  diet: Diet;
  health: Health[];
  physical_activity: PhysicalActivity;
  meal_administration?: CaloriesDivision;
  bmr?: number;
  calories?: number;
  diet_calories?: number;
}

export interface CaloriesDivision {
  breakfast: number;
  lunch: number;
  dinner: number;
  snacks: number;
}

export interface WeightMeasurements {
  weight: number;
  timestamp: Date;
}

export interface HeightMeasurements {
  height: number;
  timestamp: Date;
}

export enum Gender {
  male = 'male',
  female = 'female',
}

export enum Goal {
  extreme_lose_weight = 'extreme_lose_weight',
  lose_weight = 'lose_weight',
  maintainance = 'maintainance',
  gain_weight = 'gain_weight',
}

export enum PhysicalActivity {
  little_to_none = 'little_to_none',
  light = 'light',
  medium = 'medium',
  hard = 'hard',
  intense = 'intense',
}

export enum Diet {
  empty = 'empty',
  balanced = 'balanced',
  high_fiber = 'high_fiber',
  high_protein = 'high_protein',
  low_carb = 'low_carb',
  low_fat = 'low_fat',
  low_sodium = 'low_sodium',
}

export enum Health {
  empty = 'empty',
  alcohol_free = 'alcohol_free',
  celery_free = 'celery-free',
  crustacean_free = 'crustacean_free',
  dairy_free = 'dairy_free',
  egg_free = 'egg_free',
  fish_free = 'fish_free',
  gluten_free = 'gluten_free',
  low_sugar = 'low_sugar',
  peanut_free = 'peanut_free',
  pork_free = 'pork_free',
  red_meat_free = 'red_meat_free',
  vegan = 'vegan',
  vegetarian = 'vegetarian',
  wheat_free = 'wheat_free',
}
