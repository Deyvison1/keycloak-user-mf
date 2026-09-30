import { Routes } from '@angular/router';
import { hasRoleGuard } from '@supremenetwork/ui';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'grid',
    pathMatch: 'full',
  },
  {
    path: 'grid',
    loadComponent: () => import('./features/user/user-grid/user-grid').then((m) => m.UserGrid),
    canActivate: [hasRoleGuard(['USER'])],
  },
  {
    path: 'form',
    loadComponent: () => import('./features/user/user-form/user-form').then((m) => m.UserForm),
    canActivate: [hasRoleGuard(['USER_MANAGE'])],
  },
  {
    path: 'form/:id',
    loadComponent: () => import('./features/user/user-form/user-form').then((m) => m.UserForm),
    canActivate: [hasRoleGuard(['USER_MANAGE'])],
  },
];
