import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { CredentialsService } from '../services/credentials.service';

@Injectable({
  providedIn: 'root',
})

export class PermissionGuard implements CanActivate {
  constructor(private credentialsService: CredentialsService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    const role: string = this.credentialsService.role;
    const codes: string[] = route.data['permissions'];

    return codes.some((code)=> code === role);  
  }

}