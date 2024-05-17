import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { ResumeComponent } from './dashboard/resume/resume.component';
import { authGuard } from './guards/auth.guard';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: 'login',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: ResumeComponent,
      }
      // más rutas aquí
    ],
  },
];
