import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Package } from '../interfaces/package.interface';
import { CredentialsService } from '../../shared/services/credentials.service';

@Injectable({providedIn: 'root'})
export class PackagesService {
  baseUrl: string  = environment.baseUrl;
  constructor(
    private httpClient: HttpClient,
    private credentialsService: CredentialsService
  ) { }

  get_packages(): Observable<Package[]> {
    const token = this.credentialsService.token;
    const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    return this.httpClient.get<Package[]>(`${this.baseUrl}/packages`, {headers});
  }

  add_package(package_: Package): Observable<Package> {
    const token = this.credentialsService.token;
    const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    return this.httpClient.post<Package>(`${this.baseUrl}/packages`, package_, {headers});
  }
}