import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { CredentialsService } from "../../shared/services/credentials.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private credentialsService:CredentialsService, private router: Router) { }

  canActivate(): boolean {    
    if(!this.credentialsService.token){
      this.credentialsService.clearCredentials();
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}