import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PackagesService } from '../../services/packages.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Package } from '../../interfaces/package.interface';
import * as moment from 'moment';

@Component({
  selector: 'app-register-location',
  templateUrl: './register-location.component.html',
  styleUrls: ['./register-location.component.css']
})
export class RegisterLocationComponent {
  currentLocation = this.pack.route_list[this.pack.route_list.length - 1];
  locationGroup: FormGroup;

  constructor(private fb: FormBuilder,
    private packagesService: PackagesService,
    public dialogRef: MatDialogRef<RegisterLocationComponent>,
    @Inject(MAT_DIALOG_DATA) public pack: Package,

  ) { 
    this.locationGroup = this.fb.group({
      location: [this.currentLocation.location || '', Validators.required],
      date: [moment().format('DD-MM-YYYY')],
    })
  }

  saveData(): void {    
    this.packagesService.update_location(this.pack._id!, this.locationGroup.value)
    .subscribe(() => {
      this.dialogRef.close(true);
    })
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
