import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  ) { }

  get_packages(): Observable<Package[]> {
    return this.httpClient.get<Package[]>(`${this.baseUrl}/packages`);
  }

  add_package(package_: Package): Observable<Package> {
    return this.httpClient.post<Package>(`${this.baseUrl}/packages`, package_);
  }

  get_active_packages(user_id:string): Observable<Package[]> {    
    return this.httpClient.get<Package[]>(`${this.baseUrl}/packages/deliverymen/${user_id}`);
  }

  get_packages_by_date(date: string): Observable<Package[]> {
    const params = new HttpParams().set('date', date);
    return this.httpClient.get<Package[]>(`${this.baseUrl}/packages_by_date`, {params});
  }
}