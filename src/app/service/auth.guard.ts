import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  //create a constructor
  constructor(public router: Router){
  }
  //admin/manger/ceo 
  //check role id here:
  //routes roleid and sessionrole ==true !=false
  canActivate(
    route: ActivatedRouteSnapshot):boolean {

      //Expected role: from url
      const expectedRole = route.data.role;
      //Currenrt role: sessionStorage
      const currentRole=sessionStorage.getItem("ACCESS_ROLE");

      if(currentRole !== expectedRole){
        this.router.navigateByUrl('login');
        return false;
      }

    return true;
  }
  
}