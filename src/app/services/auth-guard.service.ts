import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let authState = this.authService.isAuthenticated();
    if(state.url !== '/Home' && state.url !== '/Existing' && state.url !== '/Create'){
      if (authState){
        return true;
      } else {
        this.router.navigate(['Home']);
        return false;
      }
    } else {
      if (authState){
        if (confirm('Are you sure that you want to leave the project?')){
          this.authService.logout();
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
  }
}
