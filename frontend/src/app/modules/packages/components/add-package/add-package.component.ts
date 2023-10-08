import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Package, Deliveryman } from '../../interfaces/package.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PackagesService } from '../../services/packages.service';
import { SelectDeliverymanComponent } from '../select-deliveryman/select-deliveryman.component';
import * as moment from 'moment';
@Component({
  selector: 'packages-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: [ './add-package.component.css']
})
export class AddPackageComponent {
  date = moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

  newPackageForm: FormGroup = this.fb.group({
    description: ['', Validators.required],
    size: ['', Validators.required],
    sender: ['', Validators.required],
    receiver_info: this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
    }),
    status_list: this.fb.array([ 
      this.fb.group({
        status: ['', Validators.required],
        date: [this.date],
      })
    ]),
    shipment_date: ['', Validators.required],
    route_list: this.fb.array([  
      this.fb.group({
        location: ['', Validators.required],
        date: [this.date],
      })
    ]),
    deliveryman: this.fb.group({
      user_id: [''],
      name: ['', Validators.required],
    }),
  });

  deliveryman: Deliveryman = {
    user_id: '',
    name: ''  
  }

  constructor( 
    private fb: FormBuilder,
    private packagesService: PackagesService,
    public dialogRef: MatDialogRef<AddPackageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Package,
    public dialog: MatDialog,
  ){}

  saveData(): void {
    this.newPackageForm.markAllAsTouched();
    if (this.newPackageForm.invalid) return;
    this.packagesService.add_package(this.newPackageForm.value)
    .subscribe((response) => {
      this.dialogRef.close(response);
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  selectDeliveryman(): void {
    const dialogRef = this.dialog.open(SelectDeliverymanComponent, {
      height: '550px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.newPackageForm.patchValue({
          deliveryman: {
            id: result._id,
            name: result.name,
          }});
        this.deliveryman.name = result.name;
        this.deliveryman.user_id = result._id;
      }
    });
  }
}
