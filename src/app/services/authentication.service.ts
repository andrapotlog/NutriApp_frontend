import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, tap } from 'rxjs/operators';

import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';

const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  token = '';

  constructor(
    private http: HttpClient,
    private auth: Auth,
    private alertController: AlertController
  ) {
    this.loadToken();
  }

  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      console.log('set token: ', token.value);
      this.token = token.value;
    }
  }

  async register(credentials: { email; password }) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        credentials.email,
        credentials.password
      );
      this.isAuthenticated.next(true);
      return user;
    } catch (e) {
      this.isAuthenticated.next(false);
      return null;
    }
  }

  async login(credentials: { email; password }) {
    console.log(credentials);
    try {
      const user = await signInWithEmailAndPassword(
        this.auth,
        credentials.email,
        credentials.password
      );
      this.isAuthenticated.next(true);
      return user;
    } catch (e) {
      this.isAuthenticated.next(false);
      return null;
    }
  }

  logout() {
    return signOut(this.auth);
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
