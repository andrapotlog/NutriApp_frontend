import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealsAdministrationPage } from './meals-administration.page';

const routes: Routes = [
  {
    path: '',
    component: MealsAdministrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealsAdministrationPageRoutingModule {}
