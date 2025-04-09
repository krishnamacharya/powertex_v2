import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GlobalServiceService } from './global-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  admin:any=["internal-users",""];
  constructor(private Authenticate: GlobalServiceService, private router: Router) {}
  canActivate(): boolean {
    if(this.Authenticate.check_user()){
        return true;
      }
      else {
        this.router.navigateByUrl('/home');
        return false;
      }
  }
}