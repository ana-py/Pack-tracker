import { NgModule } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    exports: [
        MatInputModule, 
        MatFormFieldModule, 
        MatIconModule,
        MatButtonModule
    ]
})
export class MaterialModule {}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          