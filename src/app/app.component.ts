import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/user/users.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private userService: UsersService) {}

  ngOnInit(): void {}
}
