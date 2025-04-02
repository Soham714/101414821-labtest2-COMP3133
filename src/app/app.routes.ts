import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/missionlist/missionlist.component').then(
        m => m.MissionlistComponent
      )
  },
  {
    path: 'mission/id',
    loadComponent: () =>
      import('./components/missiondetails/missiondetails.component').then(
        m => m.MissiondetailsComponent
      )
  }
];
