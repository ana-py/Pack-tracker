import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersPageComponent } from './pages/users-page/users-page.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "users",
        component: UsersPageComponent,
      },
      {
        path: "**",
        redirectTo: "users",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule { }
