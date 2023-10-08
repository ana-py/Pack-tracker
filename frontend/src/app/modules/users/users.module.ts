import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from "../material/material.module";

@NgModule({
    imports: [
      SharedModule,
      MaterialModule
    ],

  })
  export class UsersModule { }