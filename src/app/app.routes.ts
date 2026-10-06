import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'timer',
    title: 'Timer',
    loadComponent: () =>
      import('./timer/timer.component').then((m) => m.TimerComponent),
  },
  {
    path: 'todo',
    title: 'To do',
    loadComponent: () =>
      import('./todo/todo.component').then((m) => m.TodoComponent),
  },
  {
    path: 'groceries',
    title: 'Groceries',
    loadComponent: () =>
      import('./groceries/groceries.component').then((m) => m.GroceriesComponent),
  },
  { path: '**', redirectTo: '' },
];
