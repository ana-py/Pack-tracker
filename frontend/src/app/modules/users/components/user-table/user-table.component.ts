import { Component } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'user-table',
  templateUrl: './user-table.component.html',
  styles: [
  ]
})
export class UserTableComponent {
  users: User[] = []
  constructor(
    private usersService: UsersService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.callService();
  }

  callService(): void {
    this.usersService.get_users().
    subscribe((users) => {
      this.users = users;
    });
  } 

  createUser(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.callService();
    });
  }
}
