import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  minLength = 6;

  credentials: FormGroup = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    //birthdate
    //gender
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(this.minLength),
    ]),
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}

  get email() {
    return this.credentials.get('email').value;
  }

  get password() {
    return this.credentials.get('password').value;
  }

  redirectToLogin() {
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.register(this.credentials.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/register/create-profile', {
        replaceUrl: true,
      });
    } else {
      this.authService.showAlert('Registration failed', 'Please try again!');
    }
  }
}
