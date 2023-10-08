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

@NgModule({
  declarations: [
    PackagesPageComponent,
    AddPackageComponent,
    PackageTableComponent,
    SelectDeliverymanComponent
  ],
  imports: [
    CommonModule,
    PackagesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    UsersModule
  ]
})
export class PackagesModule { }
