import { Routes } from '@angular/router';
import { routesGuards } from './guards/routes.guard';

export const routes: Routes = [
    {path: '', loadComponent: ()=>import('./pages/user/login/login.component').then(c => c.LoginComponent)},
    {path: 'login', loadComponent: ()=>import('./pages/user/login/login.component').then(c => c.LoginComponent)},
    {path: 'register', loadComponent: ()=>import('./pages/user/register/register.component').then(c => c.RegisterComponent)},
    {path: 'recover', loadComponent: ()=>import('./pages/user/recover/recover.component').then(c => c.RecoverComponent)},
    {path: 'recover/:token', loadComponent: ()=>import('./pages/user/recover/recover.component').then(c => c.RecoverComponent)},
    {path: 'home', canActivate: [routesGuards], loadComponent: ()=>import('./pages/home/home.component').then(c => c.HomeComponent)},
];
