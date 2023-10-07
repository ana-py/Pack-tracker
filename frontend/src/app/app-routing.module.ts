import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/guards/auth.guard';

const routes: Routes = [
  {
    path:'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo:'packages'
  },
  {
    path:'',
    canActivate: [AuthGuard],
    children:[
      {
        path:'packages',
        loadChildren: () => import('./modules/packages/packages.module').then(m => m.PackagesModule)
      },
      {
        path:'**',
        redirectTo:'packages'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
