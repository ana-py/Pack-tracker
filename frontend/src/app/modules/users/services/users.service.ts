import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CredentialsService } from '../../shared/services/credentials.service';
import { User } from '../interfaces/user.interface';

@Injectable({providedIn: 'root'})
export class UsersService {
  baseUrl: string  = environment.baseUrl;
  constructor(
    private httpClient: HttpClient,
    private credentialsService: CredentialsService
  ) { }

  get_deliveryman(search?: string): Observable<User[]> {
    let param = search ? `?search=${search}` : '';
    const token = this.credentialsService.token;
    const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    console.log(`${this.baseUrl}/users/deliverymen${param}`)
    return this.httpClient.get<User[]>(`${this.baseUrl}/users/deliverymen${param}`, {headers});
  }

}