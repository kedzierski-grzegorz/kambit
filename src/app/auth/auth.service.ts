import { HttpOptionsService } from './http-options.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from './user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedUser: User;
  private loggedUser$ = new BehaviorSubject<User>(this.loggedUser);

  constructor(private http: HttpClient, private httpOptions: HttpOptionsService) { }

  signIn(firm: string, login: string, password: string): Observable<any> {
    const body = new HttpParams()
    .set('firmId', firm)
    .set('login', login)
    .set('password', password);

    return this.http.post(environment.API_URL + 'Login', body.toString(), this.httpOptions.getOptions(false));
  }

  getUser(): Observable<User> {
    const data = sessionStorage.getItem('loggedUser') || localStorage.getItem('loggedUser');
    const helper = new JwtHelperService();
    this.loggedUser = JSON.parse(data);
    this.loggedUser$.next(this.loggedUser);

    if (this.loggedUser && helper.isTokenExpired(this.loggedUser.token)) {
      this.logout();
      window.location.reload();
    }

    if (!this.loggedUser) {
      this.loggedUser$.next(null);
    }

    return this.loggedUser$.asObservable();
  }

  setToken(response, rememberMe = false): void {
    sessionStorage.setItem('firm', response.firmId);
    sessionStorage.setItem('login', response.userName);
    sessionStorage.setItem('loggedUser', JSON.stringify(response));
    sessionStorage.setItem('loggedUserCti', JSON.stringify(response));
    sessionStorage.setItem('token', response.token);

    if (rememberMe) {
      localStorage.setItem('firm', response.firmId);
      localStorage.setItem('login', response.userName);
      localStorage.setItem('loggedUser', JSON.stringify(response));
      localStorage.setItem('loggedUserCti', JSON.stringify(response));
      localStorage.setItem('token', response.token);
    }
  }

  logout(): void {
    sessionStorage.removeItem('firm');
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('loggedUser');
    sessionStorage.removeItem('loggedUserCti');
    sessionStorage.removeItem('token');

    localStorage.removeItem('firm');
    localStorage.removeItem('login');
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('loggedUserCti');
    localStorage.removeItem('token');
    this.loggedUser = undefined;
    this.loggedUser$.next(this.loggedUser);
  }

  isSessionActive(): Observable<any> {
    return this.http.get(environment.API_URL + 'Login/IsSessionActive', this.httpOptions.getOptions());
  }
}
