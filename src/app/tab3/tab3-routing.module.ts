import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
  },
  {
    path: 'objectives',
    loadChildren: () =>
      import('./objectives/objectives.module').then(
        (m) => m.ObjectivesPageModule
      ),
  },
  {
    path: 'meals-administration',
    loadChildren: () =>
      import('./meals-administration/meals-administration.module').then(
        (m) => m.MealsAdministrationPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab3PageRoutingModule {}
