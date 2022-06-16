export interface UserModel {
  id_user: number;
  first_name: string;
  last_name: string;
  created_at: Date;
  email: string;
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

export enum Diet {
  empty,
  balanced,
  high_fiber,
  high_protein,
  low_carb,
  low_fat,
  low_sodium,
}

export enum Health {
  empty,
  alcohol_free,
  celery_free,
  crustacean_free,
  dairy_free,
  egg_free,
  fish_free,
  gluten_free,
  low_sugar,
  peanut_free,
  pork_free,
  red_meat_free,
  vegan,
  vegetarian,
  wheat_free,
}

export enum Goal {
  extreme_lose_weight,
  lose_weight,
  maintainance,
  gain_weight,
}

export enum Gender {
  male,
  female,
}

export enum PhysicalActivity {
  little_to_none,
  light,
  medium,
  hard,
  intense,
}
