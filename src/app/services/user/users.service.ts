import { Injectable } from '@angular/core';
import {
  CaloriesDivision,
  Diet,
  Gender,
  Goal,
  Health,
  PhysicalActivity,
  UserModel,
} from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private user: UserModel = {
    id_user: 1,
    first_name: 'Andra',
    last_name: 'Potlog',
    created_at: new Date(),
    email: 'andraapotlog@gmail.com',
    birthdate: new Date('1999-10-02'),
    gender: Gender.female,
    height: 172,
    weight: 70,
    goal: Goal.lose_weight,
    diet: Diet.balanced,
    health: [Health.empty],
    physical_activity: PhysicalActivity.little_to_none,
    bmr: 1504,
    calories: 1800,
    diet_calories: 1500,
    meal_administration: {
      breakfast: 400,
      lunch: 400,
      dinner: 400,
      snacks: 305,
    },
  };

  constructor() {}

  getUser() {
    return { ...this.user };
  }

  calculate_age(date: Date): number {
    let timeDiff = Math.abs(Date.now() - date.getTime());

    return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
  }

  calculate_bmr(user: UserModel) {
    const standard =
      10 * user.weight +
      6.25 * user.height -
      5 * this.calculate_age(user.birthdate);

    if (user.gender === Gender.male) {
      const bmr = standard + 5;

      user.bmr = bmr;
      return bmr;
    } else {
      const bmr = standard - 161;

      user.bmr = bmr;
      return bmr;
    }
  }

  calculate_calories(user: UserModel) {
    return Math.round(
      user.physical_activity === PhysicalActivity.little_to_none
        ? 1.2 * user.bmr
        : user.physical_activity === PhysicalActivity.light
        ? 1.375 * user.bmr
        : user.physical_activity === PhysicalActivity.medium
        ? 1.55 * user.bmr
        : user.physical_activity === PhysicalActivity.hard
        ? 1.725 * user.bmr
        : 1.9 * user.bmr
    );
  }

  calculate_diet_calories(user: UserModel) {
    let diet_calories =
      user.goal === Goal.extreme_lose_weight
        ? user.calories - 500
        : user.goal === Goal.lose_weight
        ? user.calories - 300
        : user.goal === Goal.gain_weight
        ? user.calories + 500
        : user.calories;
    if (diet_calories < 1200) {
      diet_calories = 1200;
    }

    return diet_calories;
  }

  calculate_diet_calories_specific(user: UserModel, diet: Goal) {
    let diet_calories =
      diet === Goal.extreme_lose_weight
        ? user.calories - 500
        : diet === Goal.lose_weight
        ? user.calories - 300
        : diet === Goal.gain_weight
        ? user.calories + 500
        : user.calories;
    if (diet_calories < 1200) {
      diet_calories = 1200;
    }

    return diet_calories;
  }

  updateMealAdministration(div: CaloriesDivision) {
    this.user.meal_administration = { ...div };
  }

  getDesiredGoal(diet: string): Goal {
    return diet === 'extreme_lose_weight'
      ? Goal.extreme_lose_weight
      : diet === 'lose_weight'
      ? Goal.lose_weight
      : diet === 'maintainance'
      ? Goal.maintainance
      : Goal.gain_weight;
  }

  getPhysicalActivity(physical_activity: string): PhysicalActivity {
    return physical_activity === 'little_to_none'
      ? PhysicalActivity.little_to_none
      : physical_activity === 'light'
      ? PhysicalActivity.light
      : physical_activity === 'medium'
      ? PhysicalActivity.medium
      : physical_activity === 'hard'
      ? PhysicalActivity.hard
      : PhysicalActivity.intense;
  }

  createUserProfile(user: {
    first_name: string;
    last_name: string;
    email: string;
    birthdate: Date;
    gender: string;
    height: number;
    weight: number;
    goal: string;
    physical_activity: string;
  }) {
    console.log(user);

    this.user = {
      id_user: 1,
      first_name: user.first_name,
      last_name: user.last_name,
      created_at: new Date(),
      email: user.email,
      birthdate: new Date('1999-10-02'),
      gender: user.gender === 'f' ? Gender.female : Gender.male,
      height: user.height,
      weight: user.weight,
      goal: this.getDesiredGoal(user.goal),
      diet: Diet.empty,
      health: [Health.empty],
      physical_activity: this.getPhysicalActivity(user.physical_activity),
    };

    this.user.bmr = this.calculate_bmr(this.user);
    this.user.calories = this.calculate_calories(this.user);
    this.user.diet_calories = this.calculate_diet_calories(this.user);

    console.log(this.user);
  }
}
