import { Component } from '@angular/core';
import { CredentialsService } from '../../services/credentials.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  `
    li {
      cursor: pointer;
    }
  `
  ]
})
export class NavbarComponent {
  constructor(private authService: AuthService, public credentialsService: CredentialsService) {}

  logout() {
    this.authService.logout();
  }


}
