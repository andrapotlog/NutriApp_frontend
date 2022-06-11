import { Injectable } from '@angular/core';
import {
  CaloriesDivision,
  Diet,
  Gender,
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
    desired_weight: 65,
    desired_diet: Diet.lose_weight,
    physical_activity: PhysicalActivity.little_to_none,
    meal_administration: {
      breakfast: 400,
      lunch: 400,
      dinner: 400,
      snacks: 305,
    },
  };

  constructor() {}

  getUser() {
    return this.user;
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
    user.calories = Math.round(
      user.physical_activity === PhysicalActivity.little_to_none
        ? 1.2 * this.calculate_bmr(user)
        : user.physical_activity === PhysicalActivity.light
        ? 1.375 * this.calculate_bmr(user)
        : user.physical_activity === PhysicalActivity.medium
        ? 1.55 * this.calculate_bmr(user)
        : user.physical_activity === PhysicalActivity.hard
        ? 1.725 * this.calculate_bmr(user)
        : 1.9 * this.calculate_bmr(user)
    );
  }

  calculate_diet_calories(user: UserModel) {
    user.diet_calories =
      user.desired_diet === Diet.extreme_lose_weight
        ? user.calories - 500
        : user.desired_diet === Diet.lose_weight
        ? user.calories - 300
        : user.desired_diet === Diet.gain_weight
        ? user.calories + 500
        : user.calories;
    if (user.diet_calories < 1200) {
      user.diet_calories = 1200;
    }
  }

  updateMealAdministration(div: CaloriesDivision) {
    this.user.meal_administration = { ...div };
  }
}
