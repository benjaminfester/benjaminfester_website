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
    title: 'timer',
    loadComponent: () =>
      import('./timer/timer.component').then((m) => m.TimerComponent),
  },
  {
    path: 'todo',
    title: 'todo',
    loadComponent: () =>
      import('./todo/todo.component').then((m) => m.TodoComponent),
  },
  {
    path: 'groceries',
    title: 'groceries',
    loadComponent: () =>
      import('./groceries/groceries.component').then((m) => m.GroceriesComponent),
  },
  // Public on purpose: Google's sign-in consent screen links to these
  {
    path: 'privacy',
    title: 'privacy',
    data: { doc: 'privacy' },
    loadComponent: () =>
      import('./legal/legal.component').then((m) => m.LegalComponent),
  },
  {
    path: 'terms',
    title: 'terms',
    data: { doc: 'terms' },
    loadComponent: () =>
      import('./legal/legal.component').then((m) => m.LegalComponent),
  },
  { path: '**', redirectTo: '' },
];
