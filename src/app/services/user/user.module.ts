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
  desired_weight: number;
  desired_diet: Diet;
  physical_activity: PhysicalActivity;
  bmr?: number;
  calories?: number;
  diet_calories?: number;
}

export enum Diet {
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
