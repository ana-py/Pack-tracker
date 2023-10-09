import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginCredentials } from '../interfaces/auth.interfaces';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../shared/interfaces/credentials.interfaces';
import { CredentialsService } from '../../shared/services/credentials.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string  = environment.baseUrl;
  constructor(
    private httpClient: HttpClient,
    private credentialsService: CredentialsService,
    private router: Router
  ) { }

  get_credentials(user: LoginCredentials): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.baseUrl}/users/auth/login`, user);
  }

  logout() {
    this.credentialsService.clearCredentials();
    this.router.navigate(['/auth/login']);
  }
  
}
