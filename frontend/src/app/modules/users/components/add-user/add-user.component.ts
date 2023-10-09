import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  newUser: FormGroup = this.fb.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    role: ['', Validators.required]
  }
  );
  hide: boolean = true;
  constructor( 
    private fb: FormBuilder,
    private usersService: UsersService,
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ){}

  saveData(): void {
    this.newUser.markAllAsTouched();
    if (this.newUser.invalid) return;
    this.usersService.create_user(this.newUser.value)
    .subscribe((response) => {
      this.dialogRef.close(response);
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
