import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from "../material/material.module";
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { UsersRoutingModule } from "./users-routing.module";
import { AddUserComponent } from './components/add-user/add-user.component';
import { UserTableComponent } from "./components/user-table/user-table.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [
      SharedModule,
      MaterialModule,
      UsersRoutingModule,
      CommonModule,
      ReactiveFormsModule
    ],
    declarations: [
      UsersPageComponent,
      AddUserComponent,
      UserTableComponent
    ],

  })
  export class UsersModule { }