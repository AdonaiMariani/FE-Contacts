import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',  // Redirige a login por defecto si el usuario no está autenticado
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./public/pages/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'contacts',
    loadChildren: () => import('./public/pages/contacts/contacts.module').then(m => m.ContactsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./public/pages/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./public/pages/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'profile', // Ruta del perfil
    loadChildren: () => import('./public/pages/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard]
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
