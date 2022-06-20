import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Params, Router } from '@angular/router';
import { UsersService } from '../../../services/user/users.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.page.html',
  styleUrls: ['./create-profile.page.scss'],
})
export class CreateProfilePage implements OnInit {
  credentials: FormGroup = new FormGroup({
    day: new FormControl('', [Validators.required]),
    month: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    height: new FormControl('', [
      Validators.required,
      Validators.min(100),
      Validators.max(250),
    ]),
    weight: new FormControl('', [Validators.required]),
    diet: new FormControl('', [Validators.required]),
    physical_activity: new FormControl('', [Validators.required]),
  });

  private days = Array.from({ length: 30 }, (_, i) => i + 1);
  private months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  private years = Array.from({ length: 123 }, (_, i) =>
    Math.abs(i - 2022 + 16)
  );

  private routerState: Params;

  constructor(private router: Router, private userService: UsersService) {}

  ngOnInit() {
    this.routerState = this.router.getCurrentNavigation().extras.queryParams;
  }

  getMonth() {
    return this.credentials.get('month').value === 'IAN'
      ? '01'
      : this.credentials.get('month').value === 'FEB'
      ? '02'
      : this.credentials.get('month').value === 'MAR'
      ? '03'
      : this.credentials.get('month').value === 'APR'
      ? '04'
      : this.credentials.get('month').value === 'MAY'
      ? '05'
      : this.credentials.get('month').value === 'JUN'
      ? '06'
      : this.credentials.get('month').value === 'JUL'
      ? '07'
      : this.credentials.get('month').value === 'AUG'
      ? '08'
      : this.credentials.get('month').value === 'SEP'
      ? '09'
      : this.credentials.get('month').value === 'OCT'
      ? '10'
      : this.credentials.get('month').value === 'NOV'
      ? '11'
      : '12';
  }

  register() {
    const day = this.credentials.get('day').value.length === 1 ? '0' : '';

    const birthdate =
      this.credentials.get('year').value.toString() +
      '-' +
      this.getMonth() +
      '-' +
      day +
      this.credentials.get('day').value.toString();

    this.userService
      .createUserProfile({
        uid: this.routerState.uid,
        first_name: this.routerState.first_name,
        last_name: this.routerState.last_name,
        email: this.routerState.email,
        birthdate: birthdate,
        gender: this.credentials.get('gender').value,
        height: this.credentials.get('height').value,
        weight: this.credentials.get('weight').value,
        goal: this.credentials.get('diet').value,
        physical_activity: this.credentials.get('physical_activity').value,
      })
      .subscribe((res) => {
        console.log(res);
      });

    this.router.navigateByUrl('/tabs', { replaceUrl: true });
  }
}
