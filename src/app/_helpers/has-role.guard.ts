import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {

  constructor(private authService: AuthenticationService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthorize = this.authService.users.Data.role[0].item_text.includes(route.data.expectedRoles);
    console.log(isAuthorize);
    
      if(!isAuthorize){
        console.log(isAuthorize);
        alert("You are not Authorized User");
      }  
    return isAuthorize
  }

}
