import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginCredentials } from '../interfaces/auth.interfaces';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../shared/interfaces/credentials.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string  = environment.baseUrl;
  constructor(
    private httpClient: HttpClient
  ) { }

  get_credentials(user: LoginCredentials): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.baseUrl}/users/auth/login`, user);
  }
}
