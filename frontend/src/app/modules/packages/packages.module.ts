import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackagesRoutingModule } from './packages-routing.module';
import { PackagesPageComponent } from './pages/packages-page/packages-page.component';
import { MaterialModule } from '../material/material.module';
import { AddPackageComponent } from './components/add-package/add-package.component';
import { PackageTableComponent } from './components/package-table/package-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SelectDeliverymanComponent } from './components/select-deliveryman/select-deliveryman.component';
import { UsersModule } from '../users/users.module';
import { EditFieldComponent } from './components/edit-field/edit-field.component';
import { DeliverymanPackagesPageComponent } from './pages/deliveryman-packages-page/deliveryman-packages-page.component';
import { DeliveryPkgTableComponent } from './components/delivery-package-table/delivery-package-table.component';
import { PackagesReportsPageComponent } from './pages/packages-reports-page/packages-reports-page.component';
import { PackagesReportsComponent } from './components/packages-reports/packages-reports.component';

@NgModule({
  declarations: [
    PackagesPageComponent,
    AddPackageComponent,
    PackageTableComponent,
    SelectDeliverymanComponent,
    EditFieldComponent,
    DeliverymanPackagesPageComponent,
    DeliveryPkgTableComponent,
    PackagesReportsPageComponent,
    PackagesReportsComponent
  ],
  imports: [
    CommonModule,
    PackagesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    UsersModule,
    SharedModule
  ]
})
export class PackagesModule { }
