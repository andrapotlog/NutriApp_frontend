import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObjectivesPageRoutingModule } from './objectives-routing.module';

import { ObjectivesPage } from './objectives.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObjectivesPageRoutingModule
  ],
  declarations: [ObjectivesPage]
})
export class ObjectivesPageModule {}
