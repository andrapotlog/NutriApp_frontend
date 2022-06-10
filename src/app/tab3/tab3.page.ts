import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { UserModel } from '../services/user/user.module';
import { UsersService } from '../services/user/users.service';

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
    this.userService.calculate_calories(this.user);
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
