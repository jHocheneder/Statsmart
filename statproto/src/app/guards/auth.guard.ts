import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (
    public router: Router
  ) { }

  canActivate(): boolean {
    if ( !this.isAuthenticated() ) {
      this.router.navigate(['login'])
      return false
    }

    return true
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token')
    if ( token && token != 'null' )
      return !new JwtHelperService().isTokenExpired(token)
    return false
  }
  
}
