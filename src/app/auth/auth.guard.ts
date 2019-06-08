import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.auth.isAuthenticated()) {
      (document.querySelector('kambit-header') as HTMLElement).style.setProperty('display', 'block');
      (document.querySelector('kambit-footer') as HTMLElement).style.setProperty('display', 'block');
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
