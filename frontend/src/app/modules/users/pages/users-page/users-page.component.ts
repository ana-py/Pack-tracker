import { Component } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../../components/add-user/add-user.component';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styles: [
  ]
})
export class UsersPageComponent {
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
