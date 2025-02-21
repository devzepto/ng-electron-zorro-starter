import { Route } from '@angular/router';

export const appRoutes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'blank', loadChildren: () => import('./layout/blank/blank-routing') },
  { path: 'login', data: { preload: true, shouldDetach: 'no', key: 'login' }, loadComponent: () => import('./pages/other-login/login1.component').then(m => m.Login1Component) },
  { path: 'default', data: { preload: true }, loadChildren: () => import('./layout/default/default-routing') },
  { path: '**', redirectTo: '/login' }
] as Route[];
