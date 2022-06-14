import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.page.html',
  styleUrls: ['./create-profile.page.scss'],
})
export class CreateProfilePage implements OnInit {
  credentials: FormGroup = new FormGroup({
    birthdate: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    height: new FormControl('', [
      Validators.required,
      Validators.min(100),
      Validators.max(250),
    ]),
    weight: new FormControl('', [Validators.required]),
    desired_weight: new FormControl('', [Validators.required]),
    diet: new FormControl('', [Validators.required]),
    physical_activity: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor() {}

  ngOnInit() {}

  register() {}
}
