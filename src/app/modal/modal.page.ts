import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FoodsService } from '../services/food/foods.service';
import { FoodsModel } from '../services/food/foods.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { UtilsService } from '../services/utils/utils.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  private foods: FoodsModel[];
  searchField: string;
  data: any[];

  item: FormGroup = new FormGroup({
    grams: new FormControl('', [Validators.required]),
  });

  private gramsInput: number;

  constructor(
    private modalContr: ModalController,
    private foodService: FoodsService,
    private util: UtilsService
  ) {}

  @Input() openedFrom: string;

  @Output() refresh: EventEmitter<boolean> = new EventEmitter();

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
    this.foodService.addToDB(foodItem, this.gramsInput, meal);
    this.refresh.emit(true);

    this.modalContr.dismiss();
    console.log(this.util.getCalendar());
  }

  closeModal() {
    this.modalContr.dismiss();
  }
}
