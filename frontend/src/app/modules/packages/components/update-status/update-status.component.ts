import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Package, StatusList } from '../../interfaces/package.interface';
import { PackagesService } from '../../services/packages.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.css']
})
export class UpdateStatusComponent {
  currentStatus = this.pack.status_list[this.pack.status_list.length - 1];
  statusGroup: FormGroup;

  constructor(private fb: FormBuilder,
    private packagesService: PackagesService,
    public dialogRef: MatDialogRef<UpdateStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public pack: Package,

  ) { 
    this.statusGroup = this.fb.group({
      status: [this.currentStatus.status || '', Validators.required],
      date: [moment().format('DD-MM-YYYY')],
    })
  }

  saveData(): void {    
    this.packagesService.update_status(this.pack._id!, this.statusGroup.value)
    .subscribe(() => {
      this.dialogRef.close(true);
    })
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
