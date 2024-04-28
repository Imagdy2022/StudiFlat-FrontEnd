import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './_helpers/auth.guard';
const routes: Routes = [
  

  {
    path: '',canActivate: [AuthGuard], loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule), 
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
   { path: 'login', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
  {path: '**', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
