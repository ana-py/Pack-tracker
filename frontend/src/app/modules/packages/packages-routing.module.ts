import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPackagesPageComponent } from './pages/admin-packages-page/admin-packages-page.component';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '../shared/guards/permission.guard';
import { DeliverymanPackagesPageComponent } from './pages/deliveryman-packages-page/deliveryman-packages-page.component';
import { PackagesReportsPageComponent } from './pages/packages-reports-page/packages-reports-page.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "adminPackages",
        component: AdminPackagesPageComponent,
        canActivate: [PermissionGuard],
        data: {permissions: ['admin']}
      },
      {
        path: "deliverymanPackages",
        component: DeliverymanPackagesPageComponent,
        canActivate: [PermissionGuard],
        data: {permissions: ['deliveryman']}
      },
      {
        path: "packagesReports",
        component: PackagesReportsPageComponent,
        canActivate: [PermissionGuard],
        data: {permissions: ['admin']}
      },
      {
        path: "",
        pathMatch: "full",
        redirectTo: (localStorage.getItem('role') == 'admin') ? 'adminPackages' : 'deliverymanPackages'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackagesRoutingModule { }
