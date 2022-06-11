import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/user/users.service';
import { UserModel } from '../services/user/user.model';
import { FoodsService } from '../services/food/foods.service';
import { FoodsModel, MealDB, MealReport } from '../services/food/foods.model';
import { UtilsService } from '../services/utils/utils.service';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  private user: UserModel;
  private foods: FoodsModel[];

  private breakfastDB: MealDB[] = [];
  private lunchDB: MealDB[] = [];
  private dinnerDB: MealDB[] = [];
  private snacksDB: MealDB[] = [];

  private nowDate = new Date();

  private grams = 200;

  constructor(
    private userService: UsersService,
    private foodServ: FoodsService,
    private utilsService: UtilsService,
    private modalContr: ModalController,
    private routerOutler: IonRouterOutlet
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.userService.calculate_calories(this.user);

    this.foods = this.foodServ.getFoods();

    //this.breakfastDB = this.foods.slice();
    const todayEntry = this.utilsService.getEntryOfDay(this.nowDate);
    this.breakfastDB = todayEntry.breakfastDB;
  }

  async openModal(data: string) {
    const modal = await this.modalContr.create({
      component: ModalPage,
      canDismiss: true,
      presentingElement: this.routerOutler.nativeEl,
      componentProps: {
        openedFrom: data,
      },
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

  /*let currentModal = null;
  async function openModal(opts = {}) {
    const modal = await modalController.create({
      component: 'modal-content',
      ...opts,
    });
    modal.present();

    currentModal = modal;
  }

  openCardModal() {
    openModal({
      swipeToClose: true,
      presentingElement: pageEl,
    });
  }*/
}
