import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/user/users.service';
import {
  HeightMeasurements,
  WeightMeasurements,
} from '../../services/user/user.model';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.page.html',
  styleUrls: ['./measurements.page.scss'],
})
export class MeasurementsPage implements OnInit {
  private weights: WeightMeasurements[];

  private heights: HeightMeasurements[];

  private expandWeight = false;
  private expandHeight = false;

  constructor(private router: Router, private userService: UsersService) {}

  ngOnInit() {
    this.userService.getWeights().subscribe((result) => {
      console.log(result);
      this.weights = result;
    });

    this.userService.getHeights().subscribe((result) => {
      console.log(result);
      this.heights = result;
    });
  }

  getDate(date: Date) {
    return new Date(date).toLocaleDateString();
  }

  back() {
    this.router.navigateByUrl('/tabs/tab3', { replaceUrl: true });
  }
}
