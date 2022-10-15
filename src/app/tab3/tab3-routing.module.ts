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
    path: 'measurements',
    loadChildren: () =>
      import('./measurements/measurements.module').then(
        (m) => m.MeasurementsPageModule
      ),
  },
  {
    path: 'personal-data',
    loadChildren: () => import('./personal-data/personal-data.module').then( m => m.PersonalDataPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab3PageRoutingModule {}
