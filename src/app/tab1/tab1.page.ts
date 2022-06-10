import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/user/users.service';
import { UserModel } from '../services/user/user.module';
import { FoodsService } from '../services/food/foods.service';
import { FoodsModel } from '../services/food/foods.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  private user: UserModel;
  private foods: FoodsModel[];
  private breakfastDB: FoodsModel[] = [];
  private lunchDB: FoodsModel[] = [];
  private dinnerDB: FoodsModel[] = [];
  private snacksDB: FoodsModel[] = [];

  private grams = 200;

  constructor(
    private userService: UsersService,
    private foodServ: FoodsService
  ) {}

  emptyDB(db: FoodsModel[]) {
    return Object.keys(db).length === 0;
  }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.userService.calculate_calories(this.user);

    this.foods = this.foodServ.getFoods();

    this.breakfastDB = this.foods.slice();
  }

  totalCaloriesPerMeal(db: FoodsModel[]): number {
    let total = 0;

    db.forEach((food) => {
      total += (this.grams / 100) * food.energ_kcal;
    });

    return total;
  }

  totalCaloriesPerDay() {
    return Math.round(
      this.totalCaloriesPerMeal(this.breakfastDB) +
        this.totalCaloriesPerMeal(this.lunchDB) +
        this.totalCaloriesPerMeal(this.dinnerDB) +
        this.totalCaloriesPerMeal(this.snacksDB)
    );
  }
}
