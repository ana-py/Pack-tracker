import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Package, RouteList, StatusList } from '../interfaces/package.interface';
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

  get_package(id: string): Observable<Package> {
    return this.httpClient.get<Package>(`${this.baseUrl}/packages/${id}`);
  }

  add_package(package_: Package): Observable<Package> {
    return this.httpClient.post<Package>(`${this.baseUrl}/packages`, package_);
  }

  update_package(id:string, package_: Package): Observable<Package> {
    return this.httpClient.put<Package>(`${this.baseUrl}/packages/${id}`, package_);
  }

  update_status(id: string, newStatus: StatusList): Observable<Package> {
    return this.httpClient.put<Package>(`${this.baseUrl}/packages/update_status/${id}`, newStatus);
  }

  update_location(id: string, newLocation: RouteList): Observable<Package> {
    return this.httpClient.put<Package>(`${this.baseUrl}/packages/register_location/${id}`, newLocation);
  }

  get_active_packages(user_id:string): Observable<Package[]> {    
    return this.httpClient.get<Package[]>(`${this.baseUrl}/packages/deliverymen/${user_id}`);
  }

  get_packages_by_date(date: string): Observable<Package[]> {
    const params = new HttpParams().set('date', date);
    return this.httpClient.get<Package[]>(`${this.baseUrl}/packages_by_date`, {params});
  }

  confirm_delivery(id: string): Observable<Package> {
    return this.httpClient.put<Package>(`${this.baseUrl}/public/packages/certificate/${id}`, {}  );
  }
}