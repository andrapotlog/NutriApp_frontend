import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/user/users.service';
import { Diet, UserModel } from '../../services/user/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.page.html',
  styleUrls: ['./objectives.page.scss'],
})
export class ObjectivesPage implements OnInit {
  private edit: boolean = false;
  private user: UserModel;

  private selectedValue = '';

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  getDesiredDiet() {
    return this.user.desired_diet === Diet.extreme_lose_weight
      ? 'Lose Weight Fast'
      : this.user.desired_diet === Diet.lose_weight
      ? 'Lose Weight'
      : this.user.desired_diet === Diet.maintainance
      ? 'Maintenance'
      : 'Gain Weight';
  }

  getDesiredDietFromString(diet: string) {
    return diet === 'extreme_lose_weight'
      ? Diet.extreme_lose_weight
      : diet === 'lose_weight'
      ? Diet.lose_weight
      : diet === 'maintainance'
      ? Diet.maintainance
      : Diet.gain_weight;
  }

  editOn() {
    this.edit = true;
  }

  editOff() {
    this.edit = false;
    console.log(this.selectedValue);
    this.user.desired_diet = this.getDesiredDietFromString(this.selectedValue);
  }
}
