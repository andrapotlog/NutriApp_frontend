import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealsAdministrationPageRoutingModule } from './meals-administration-routing.module';

import { MealsAdministrationPage } from './meals-administration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MealsAdministrationPageRoutingModule
  ],
  declarations: [MealsAdministrationPage]
})
export class MealsAdministrationPageModule {}
