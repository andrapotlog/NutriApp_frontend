import { Component, OnInit } from '@angular/core';
import { FoodsService } from '../services/food/foods.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  mealSelected: string;
  recommendations: any[] = [];

  constructor(private foodService: FoodsService) {}

  ngOnInit(): void {
    console.log(this.mealSelected);
  }

  optionsFn() {
    let meal =
      this.mealSelected === 'breakfast'
        ? 'Breakfast'
        : this.mealSelected === 'lunch'
        ? 'Lunch'
        : this.mealSelected === 'dinner'
        ? 'Dinner'
        : 'Snack';
    console.log(this.mealSelected);
    console.log(meal);
    this.foodService.getRecipeAPI('chicken', meal).subscribe((data) => {
      this.recommendations = data.hits;
      console.log(data.hits);
    });
  }
}
