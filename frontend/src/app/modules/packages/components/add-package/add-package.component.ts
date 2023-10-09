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
  date = moment().format('DD-MM-YYYY');

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
    shipment_date: [new Date(), Validators.required],
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
    @Inject(MAT_DIALOG_DATA) public pack: Package,
    public dialog: MatDialog,
  ){
    if(this.pack && this.pack._id){
      this.loadForm(this.pack);
      this.deliveryman.user_id = this.pack.deliveryman.user_id;
      this.deliveryman.name = this.pack.deliveryman.name;
    }
  }

  loadForm(pack: Package){
    this.newPackageForm.reset({
      description: pack.description,
      size: pack.size,
      sender: pack.sender,
      receiver_info: {
        name: pack.receiver_info.name,
        address: pack.receiver_info.address,
        email: pack.receiver_info.email,
      },
      status_list: [
        {
          status: pack.status_list[pack.status_list.length-1].status,
          date: pack.status_list[pack.status_list.length-1].date,
        }
      ],
      shipment_date: new Date(pack.shipment_date),
      route_list: [
        {
          location: pack.route_list[pack.route_list.length-1].location,
          date: pack.route_list[pack.route_list.length-1].date,
        }
      ],
      deliveryman: {
        user_id: pack.deliveryman.user_id,
        name: pack.deliveryman.name,
      },
    });
  }

  saveData(): void {
    this.newPackageForm.markAllAsTouched();
    if (this.newPackageForm.invalid) return;

    const date = this.newPackageForm.value.shipment_date;
    this.newPackageForm.value.shipment_date = moment(date).format('YYYY-MM-DD')
    if (this.pack && this.pack._id){
      this.updatePackage();
    } 
    else{
      this.createPackage();
    }
  }

  createPackage(){
    this.packagesService.add_package(this.newPackageForm.value)
    .subscribe((response) => {
      this.dialogRef.close(response);
    });
  }

  updatePackage(){
    this.packagesService.update_package(this.pack._id!, this.newPackageForm.value)
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
        this.newPackageForm.get('deliveryman')?.get('user_id')?.setValue(result._id);
        this.newPackageForm.get('deliveryman')?.get('name')?.setValue(result.name);
        this.deliveryman.name = result.name;
        this.deliveryman.user_id = result._id;
      }
    });
  }
}
