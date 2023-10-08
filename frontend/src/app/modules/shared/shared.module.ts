import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { UserTableComponent } from '../users/components/user-table/user-table.component';



@NgModule({
  declarations: [
    SearchBoxComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    SearchBoxComponent,
    NavbarComponent
  ]
})
export class SharedModule { }
