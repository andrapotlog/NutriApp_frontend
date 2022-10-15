import { Component, OnInit } from '@angular/core';
import { FoodsService } from '../services/food/foods.service';
import { RecipesService } from '../services/recipes/recipes.service';
import { UserModel } from '../services/user/user.model';
import { UsersService } from '../services/user/users.service';
import { RecipeModel } from '../services/recipes/recipes.model';
import { FoodsModel, MealDB } from '../services/food/foods.model';
import { Journal } from '../services/utils/utils.model';
import { UtilsService } from '../services/utils/utils.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  private user: UserModel;
  mealSelected: string;
  recommendations: RecipeModel[] = [];

  private gramsInput: number;
  private today = new Date();

  private date = '09.12.2022';

  private entry: Journal;
  private breakfastDB: MealDB[] = [];
  private lunchDB: MealDB[] = [];
  private dinnerDB: MealDB[] = [];
  private snacksDB: MealDB[] = [];

  constructor(
    private foodService: FoodsService,
    private recipeService: RecipesService,
    private userService: UsersService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.foodService.recipesToDB().subscribe((res) => console.log(res));

    this.updateMeals();
  }

  getDate(date: Date) {
    return new Date(date).toLocaleDateString();
  }

  updateMeals() {
    this.utilsService
      .getEntryOfADay(this.getDate(this.today))
      .subscribe((entry) => {
        this.entry = entry[0];

        this.foodService
          .getMealEntry(entry[0].breaskfast_entry)
          .subscribe((meal) => {
            console.log(meal);
            this.breakfastDB = meal;
          });

        this.foodService
          .getMealEntry(entry[0].lunch_entry)
          .subscribe((meal) => {
            this.lunchDB = meal;
          });

        this.foodService
          .getMealEntry(entry[0].dinner_entry)
          .subscribe((meal) => {
            this.dinnerDB = meal;
          });

        this.foodService
          .getMealEntry(entry[0].snack_entry)
          .subscribe((meal) => {
            this.snacksDB = meal;
          });
      });
  }

  optionsFn() {
    this.recipeService
      .getRecipes(this.user.id_user, this.mealSelected)
      .subscribe((res) => {
        this.recommendations = res.sort(() => Math.random() - 0.5).slice(0, 50);
        console.log(res);
      });
  }

  getRound(x: number): number {
    return Math.round(x);
  }

  emptyDB(db: MealDB[]) {
    return Object.keys(db).length === 0;
  }

  addItem(recipe: RecipeModel) {
    console.log(this.gramsInput);

    const foodFromRecipe: FoodsModel = {
      id_food: recipe.id_recipe,
      name: recipe.name,
      category: 'recipe',
      measure_label: recipe.measure_label,
      energ_kcal: recipe.energ_kcal,
      protein: recipe.protein,
      carbs: recipe.carbs,
      fats: recipe.fats,
    };

    let id_meal = 0;

    if (this.mealSelected === 'breakfast') {
      id_meal = this.emptyDB(this.breakfastDB)
        ? 0
        : this.entry.breaskfast_entry;
    } else if (this.mealSelected === 'lunch') {
      id_meal = this.emptyDB(this.lunchDB) ? 0 : this.entry.lunch_entry;
    } else if (this.mealSelected === 'dinner') {
      id_meal = this.emptyDB(this.dinnerDB) ? 0 : this.entry.dinner_entry;
    } else {
      id_meal = this.emptyDB(this.snacksDB) ? 0 : this.entry.snack_entry;
    }

    this.foodService.addToDB(
      foodFromRecipe,
      this.gramsInput,
      this.mealSelected,
      id_meal,
      this.getDate(this.today)
    );

    this.updateMeals();
  }
}
