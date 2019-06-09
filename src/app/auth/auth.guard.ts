import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.auth.isSessionActive().pipe(
      map(isLoggedIn => {
        if (isLoggedIn) {
          this.auth.getUser();
          return true;
        } else {
          this.router.navigate(['/login']);
          this.auth.logout();
          return false;
        }
      }),
      catchError((err) => {
        this.router.navigate(['/login']);
        this.auth.logout();
        return of(false);
      }
    ));
  }
}
