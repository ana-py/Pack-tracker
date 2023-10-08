import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Deliveryman } from '../../interfaces/package.interface';
import { UsersService } from 'src/app/modules/users/services/users.service';
import { User } from 'src/app/modules/users/interfaces/user.interface';
@Component({
  selector: 'app-select-deliveryman',
  templateUrl: './select-deliveryman.component.html',
  styles: [
  ]
})
export class SelectDeliverymanComponent implements OnInit{
  deliverymen: User[] = [];
  searchPerformed: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<SelectDeliverymanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private usersService: UsersService
  ) { } 

  ngOnInit(): void {
    this.callService();
  }

  callService(term?: string): void {
    this.usersService.get_deliveryman(term)
    .subscribe((deliverymen: User[]) => {
      this.deliverymen = deliverymen;
    } )
  }

  selectDeliveryman(deliveryman: User): void {
    this.dialogRef.close(deliveryman);  
  }

  search(term: string): void {
    this.callService(term);
    this.searchPerformed = true;    
  }
}
