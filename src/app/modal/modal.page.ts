import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FoodsService } from '../services/food/foods.service';
import { FoodsModel } from '../services/food/foods.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  private foods: FoodsModel[];
  searchField: string;
  data: any[];

  private gramsInput: number;

  constructor(
    private modalContr: ModalController,
    private foodService: FoodsService
  ) {}

  @Input() openedFrom: string;
  @Input() id_meal: number;
  @Input() date: string;

  ngOnInit(): void {
    this.foods = this.foodService.getFoods();
  }

  handleLogin() {
    console.log(this.searchField);
    if (this.searchField === '') {
      this.data = [];
    } else {
      this.foodService
        .getFoodDatabaseAPI(this.searchField)
        .subscribe((data) => {
          this.data = data.hints;
          console.log(data.hints);
        });
    }
    console.log(this.data);
  }

  addItem(foodItem: FoodsModel, meal: string) {
    console.log(this.gramsInput);
    this.foodService.addToDB(
      foodItem,
      this.gramsInput,
      meal,
      this.id_meal,
      this.date
    );

    this.modalContr.dismiss();
  }

  closeModal() {
    this.modalContr.dismiss();
  }
}
