import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/user/users.service';
import { UserModel } from '../services/user/user.model';
import { FoodsService } from '../services/food/foods.service';
import { FoodsModel, MealDB, MealReport } from '../services/food/foods.model';
import { UtilsService } from '../services/utils/utils.service';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { Journal } from '../services/utils/utils.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  private user: UserModel;
  private foods: FoodsModel[];

  private entry: Journal;
  private breakfastDB: MealDB[] = [];
  private lunchDB: MealDB[] = [];
  private dinnerDB: MealDB[] = [];
  private snacksDB: MealDB[] = [];

  private date = '20-06-2022';

  constructor(
    private userService: UsersService,
    private foodServ: FoodsService,
    private utilsService: UtilsService,
    private modalContr: ModalController,
    private routerOutler: IonRouterOutlet
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.foods = this.foodServ.getFoods();

    this.updateMeals();
  }

  updateMeals() {
    this.utilsService.getEntryOfADay(this.date).subscribe((entry) => {
      this.entry = entry[0];

      this.foodServ
        .getMealEntry(entry[0].breaskfast_entry)
        .subscribe((meal) => {
          console.log(meal);
          this.breakfastDB = meal;
        });

      this.foodServ.getMealEntry(entry[0].lunch_entry).subscribe((meal) => {
        this.lunchDB = meal;
      });

      this.foodServ.getMealEntry(entry[0].dinner_entry).subscribe((meal) => {
        this.dinnerDB = meal;
      });

      this.foodServ.getMealEntry(entry[0].snack_entry).subscribe((meal) => {
        this.snacksDB = meal;
      });
    });
  }

  async openModal(data: string) {
    let id_meal = 0;

    if (data === 'breakfast') {
      id_meal = this.emptyDB(this.breakfastDB)
        ? 0
        : this.entry.breaskfast_entry;
    } else if (data === 'lunch') {
      id_meal = this.emptyDB(this.lunchDB) ? 0 : this.entry.lunch_entry;
    } else if (data === 'dinner') {
      id_meal = this.emptyDB(this.dinnerDB) ? 0 : this.entry.dinner_entry;
    } else {
      id_meal = this.emptyDB(this.snacksDB) ? 0 : this.entry.snack_entry;
    }
    console.log('id meal: ', id_meal);

    const modal = await this.modalContr.create({
      component: ModalPage,
      canDismiss: true,
      presentingElement: this.routerOutler.nativeEl,
      componentProps: {
        openedFrom: data,
        id_meal: id_meal,
        date: this.date,
      },
    });

    modal.onDidDismiss().then((data) => {
      this.updateMeals();
    });
    return await modal.present();
  }

  emptyDB(db: MealDB[]) {
    return Object.keys(db).length === 0;
  }

  totalPerMeal(db: MealDB[]): MealReport {
    let total = 0,
      proteins = 0,
      carbs = 0,
      fats = 0;

    db.forEach((food) => {
      total +=
        (food.portion / 100) *
        this.foodServ.getFoodByID(food.id_food).energ_kcal;
      proteins +=
        (food.portion / 100) * this.foodServ.getFoodByID(food.id_food).protein;
      carbs +=
        (food.portion / 100) * this.foodServ.getFoodByID(food.id_food).carbs;
      fats +=
        (food.portion / 100) * this.foodServ.getFoodByID(food.id_food).fats;
    });

    return { total, carbs, proteins, fats };
  }

  totalPerDay(): MealReport {
    return {
      total: Math.round(
        this.totalPerMeal(this.breakfastDB).total +
          this.totalPerMeal(this.lunchDB).total +
          this.totalPerMeal(this.dinnerDB).total +
          this.totalPerMeal(this.snacksDB).total
      ),
      proteins: Math.round(
        this.totalPerMeal(this.breakfastDB).proteins +
          this.totalPerMeal(this.lunchDB).proteins +
          this.totalPerMeal(this.dinnerDB).proteins +
          this.totalPerMeal(this.snacksDB).proteins
      ),
      fats: Math.round(
        this.totalPerMeal(this.breakfastDB).fats +
          this.totalPerMeal(this.lunchDB).fats +
          this.totalPerMeal(this.dinnerDB).fats +
          this.totalPerMeal(this.snacksDB).fats
      ),
      carbs: Math.round(
        this.totalPerMeal(this.breakfastDB).carbs +
          this.totalPerMeal(this.lunchDB).carbs +
          this.totalPerMeal(this.dinnerDB).carbs +
          this.totalPerMeal(this.snacksDB).carbs
      ),
    };
  }
}
