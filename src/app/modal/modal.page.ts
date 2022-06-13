import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FoodsService } from '../services/food/foods.service';
import { FoodsModel } from '../services/food/foods.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  private foods: FoodsModel[];
  searchField: string;
  data: any[];

  constructor(
    private modalContr: ModalController,
    private foodService: FoodsService
  ) {
    // this.searchField = new FormControl('');
  }

  @Input() openedFrom: string;

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

  closeModal() {
    this.modalContr.dismiss();
  }
}
