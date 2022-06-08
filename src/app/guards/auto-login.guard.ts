import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { filter, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AutoLoginGuard implements CanLoad {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canLoad(): Observable<boolean> {
    console.log(this.authService.isAuthenticated);
    return this.authService.isAuthenticated.pipe(
      filter((val) => val !== null), // Filter out initial Behaviour subject value
      map((isAuthenticated) => {
        if (isAuthenticated) {
          // Directly open inside area
          this.router.navigateByUrl('/tabs', { replaceUrl: true });
          return true;
        } else {
          // Simply allow access to the login
          return true;
        }
      })
    );
  }
}
