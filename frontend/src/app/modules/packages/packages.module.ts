import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackagesRoutingModule } from './packages-routing.module';
import { AdminPackagesPageComponent } from './pages/admin-packages-page/admin-packages-page.component';
import { MaterialModule } from '../material/material.module';
import { AddPackageComponent } from './components/add-package/add-package.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SelectDeliverymanComponent } from './components/select-deliveryman/select-deliveryman.component';
import { UsersModule } from '../users/users.module';
import { EditFieldComponent } from './components/edit-field/edit-field.component';
import { DeliverymanPackagesPageComponent } from './pages/deliveryman-packages-page/deliveryman-packages-page.component';
import { PackagesReportsPageComponent } from './pages/packages-reports-page/packages-reports-page.component';
import { PackageDetailsComponent } from './pages/package-details/package-details.component';
import { RegisterLocationComponent } from './components/register-location/register-location.component';
import { UpdateStatusComponent } from './components/update-status/update-status.component';

@NgModule({
  declarations: [
    AdminPackagesPageComponent,
    AddPackageComponent,
    SelectDeliverymanComponent,
    EditFieldComponent,
    DeliverymanPackagesPageComponent,
    PackagesReportsPageComponent,
    PackageDetailsComponent,
    RegisterLocationComponent,
    UpdateStatusComponent,
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
