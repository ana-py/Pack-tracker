import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackagesPageComponent } from './pages/packages-page/packages-page.component';
import { PackagesRoutingModule } from './packages-routing.module';



@NgModule({
  declarations: [
    PackagesPageComponent
  ],
  imports: [
    CommonModule,
    PackagesRoutingModule
  ]
})
export class PackagesModule { }
