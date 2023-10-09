import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CredentialsService } from 'src/app/modules/shared/services/credentials.service';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
 
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private credentialsService: CredentialsService,
    private router: Router
    ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
   }

  hide: boolean = true;
  getErrorMessage(field: string) {
    if (this.loginForm.controls[field].hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }
  
  login() {
    if (this.loginForm.valid) {
      this.authService.get_credentials(this.loginForm.value)
      .subscribe((response) => {
          this.credentialsService.setCredentials(response);
          this.credentialsService.navigatetoMainPage(response.role);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
