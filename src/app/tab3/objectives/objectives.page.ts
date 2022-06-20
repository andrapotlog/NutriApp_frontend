import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/user/users.service';
import { Diet, Goal, Health, UserModel } from '../../services/user/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.page.html',
  styleUrls: ['./objectives.page.scss'],
})
export class ObjectivesPage implements OnInit {
  private editGoal: boolean = false;
  private editDiet: boolean = false;
  private editHealth: boolean = false;
  private user: UserModel;

  private selectedGoal;
  private selectedDiet;
  private selectedHealth;

  private newDietCalories = { extreme: 0, lose: 0, maintain: 0, gain: 0 };

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit() {
    this.user = this.userService.getUser();

    this.selectedGoal = this.user.goal;
    this.selectedHealth = this.user.health;

    this.newDietCalories = {
      extreme: this.userService.calculate_diet_calories_specific(
        this.user,
        Goal.extreme_lose_weight
      ),
      lose: this.userService.calculate_diet_calories_specific(
        this.user,
        Goal.lose_weight
      ),
      maintain: this.userService.calculate_diet_calories_specific(
        this.user,
        Goal.maintainance
      ),
      gain: this.userService.calculate_diet_calories_specific(
        this.user,
        Goal.gain_weight
      ),
    };
  }

  getGoal() {
    return this.user.goal === Goal.extreme_lose_weight
      ? 'Lose Weight Fast'
      : this.user.goal === Goal.lose_weight
      ? 'Lose Weight'
      : this.user.goal === Goal.maintainance
      ? 'Maintenance'
      : 'Gain Weight';
  }

  getGoalFromString(diet: string) {
    return diet === 'extreme_lose_weight'
      ? Goal.extreme_lose_weight
      : diet === 'lose_weight'
      ? Goal.lose_weight
      : diet === 'maintainance'
      ? Goal.maintainance
      : Goal.gain_weight;
  }

  getDiet() {
    return this.user.diet === Diet.empty
      ? 'None selected'
      : this.user.diet === Diet.balanced
      ? 'Balanced'
      : this.user.diet === Diet.high_fiber
      ? 'High-fiber'
      : this.user.diet === Diet.high_protein
      ? 'High-protein'
      : this.user.diet === Diet.low_carb
      ? 'Low-carb'
      : this.user.diet === Diet.low_fat
      ? 'Low-fat'
      : 'Low-sodium';
  }

  getDietFromString(diet: string) {
    return diet === 'empty'
      ? Diet.empty
      : diet === 'balanced'
      ? Diet.balanced
      : diet === 'high_fiber'
      ? Diet.high_fiber
      : diet === 'high_protein'
      ? Diet.high_protein
      : diet === 'low_carb'
      ? Diet.low_carb
      : diet === 'low_fat'
      ? Diet.low_fat
      : Diet.low_sodium;
  }

  getHealth(health: Health) {
    return health === Health.empty
      ? 'None selected'
      : health === Health.alcohol_free
      ? 'Alcohol-free'
      : health === Health.celery_free
      ? 'Celery-free'
      : health === Health.crustacean_free
      ? 'Crustacean-free'
      : health === Health.dairy_free
      ? 'Dairy-free'
      : health === Health.egg_free
      ? 'Egg-free'
      : health === Health.fish_free
      ? 'Fish-free'
      : health === Health.gluten_free
      ? 'Gluten-free'
      : health === Health.low_sugar
      ? 'Low-sugar'
      : health === Health.peanut_free
      ? 'Peanut-free'
      : health === Health.pork_free
      ? 'Pork-free'
      : health === Health.red_meat_free
      ? 'Red-meat-free'
      : health === Health.vegan
      ? 'Vegan'
      : health === Health.vegetarian
      ? 'Vegetarian'
      : 'Wheat-free';
  }

  getHealthFromString(health: string[]) {
    let healthArr: Health[] = [];

    health.forEach((item) => {
      healthArr.push(
        item === 'empty'
          ? Health.empty
          : item === 'alcohol_free'
          ? Health.alcohol_free
          : item === 'celery_free'
          ? Health.celery_free
          : item === 'crustacean_free'
          ? Health.crustacean_free
          : item === 'dairy_free'
          ? Health.dairy_free
          : item === 'egg_free'
          ? Health.egg_free
          : item === 'fish_free'
          ? Health.fish_free
          : item === 'gluten_free'
          ? Health.gluten_free
          : item === 'low_sugar'
          ? Health.low_sugar
          : item === 'peanut_free'
          ? Health.peanut_free
          : item === 'pork_free'
          ? Health.pork_free
          : item === 'red_meat_free'
          ? Health.red_meat_free
          : item === 'vegan'
          ? Health.vegan
          : item === 'vegetarian'
          ? Health.vegetarian
          : Health.wheat_free
      );
    });
    return healthArr;
  }

  editOn(from: string) {
    if (from === 'diet') {
      this.editDiet = true;
    } else if (from === 'goal') {
      this.editGoal = true;
    } else {
      this.editHealth = true;
    }
  }

  editOffGoal() {
    this.editGoal = false;
    this.user.goal = this.getGoalFromString(this.selectedGoal);
    this.user.diet_calories = this.userService.calculate_diet_calories_specific(
      this.user,
      this.user.goal
    );

    this.userService
      .updateUserGoal(this.selectedGoal, this.user.diet_calories)
      .subscribe((res) => {
        console.log(res);
      });
  }

  editOffDiet() {
    this.editDiet = false;
    this.user.diet = this.getDietFromString(this.selectedDiet);

    this.userService.updateUserDiet(this.selectedDiet).subscribe((res) => {
      console.log(res);
    });
  }

  editOffHealth() {
    this.editHealth = false;
    if (
      this.selectedHealth.length > 1 &&
      this.selectedHealth[0] === Health.empty
    ) {
      this.selectedHealth.shift();
    }
    this.user.health = this.getHealthFromString(this.selectedHealth);

    this.userService
      .updateUserHealth(this.selectedHealth.toString())
      .subscribe((res) => {
        console.log(res);
      });
  }

  back() {
    if (!this.editDiet || !this.editGoal || !this.editHealth) {
      this.router.navigateByUrl('/tabs/tab3', { replaceUrl: true });
    }
  }
}
