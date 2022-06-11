import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { UserModel } from '../services/user/user.model';
import { UsersService } from '../services/user/users.service';
import { IonNav, NavController, NavParams } from '@ionic/angular';
import { Tab1Page } from '../tab1/tab1.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  private user: UserModel;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  buttonClick() {}
}
