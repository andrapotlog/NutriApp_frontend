import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/user/users.service';
import { Goal, UserModel } from '../../services/user/user.model';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.page.html',
  styleUrls: ['./objectives.page.scss'],
})
export class ObjectivesPage implements OnInit {
  private edit: boolean = false;
  private user: UserModel;

  private selectedGoal = '';
  private selectedDiet = '';

  private newDietCalories = { extreme: 0, lose: 0, maintain: 0, gain: 0 };

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.user = this.userService.getUser();

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

  getDesiredGoal() {
    return this.user.goal === Goal.extreme_lose_weight
      ? 'Lose Weight Fast'
      : this.user.goal === Goal.lose_weight
      ? 'Lose Weight'
      : this.user.goal === Goal.maintainance
      ? 'Maintenance'
      : 'Gain Weight';
  }

  getDesiredGoalFromString(diet: string) {
    return diet === 'extreme_lose_weight'
      ? Goal.extreme_lose_weight
      : diet === 'lose_weight'
      ? Goal.lose_weight
      : diet === 'maintainance'
      ? Goal.maintainance
      : Goal.gain_weight;
  }

  editOn() {
    this.edit = true;
  }

  editOff() {
    this.edit = false;
    this.user.goal = this.getDesiredGoalFromString(this.selectedGoal);
    this.user.diet_calories = this.userService.calculate_diet_calories_specific(
      this.user,
      this.user.goal
    );
  }
}
