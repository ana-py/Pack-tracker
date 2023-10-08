import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackagesPageComponent } from './pages/packages-page/packages-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: PackagesPageComponent,
      },
      {
        path: "**",
        redirectTo: "packages",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackagesRoutingModule { }
