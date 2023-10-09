import { Component } from '@angular/core';
import { CredentialsService } from './modules/shared/services/credentials.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  public token = this.credentialsService.token;
  
  constructor(public credentialsService: CredentialsService) { }
  
}
