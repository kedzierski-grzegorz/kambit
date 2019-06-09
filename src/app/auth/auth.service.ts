import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly API_URL = 'https://hades.kambit.pl:1003/api/';

  private loggedUser: User;
  private loggedUser$ = new BehaviorSubject<User>(this.loggedUser);

  constructor(private http: HttpClient) { }

  signIn(firm: string, login: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('firmId', firm);
    body.set('login', login);
    body.set('password', password);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    return this.http.post(this.API_URL + 'Login', body.toString(), httpOptions);
  }

  getUser(): Observable<User> {
    const data = sessionStorage.getItem('loggedUser') || localStorage.getItem('loggedUser');
    this.loggedUser = JSON.parse(data);
    this.loggedUser$.next(this.loggedUser);
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
  }

  isSessionActive(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: sessionStorage.getItem('token') || localStorage.getItem('token') || ''
      })
    };
    return this.http.get(this.API_URL + 'Login/IsSessionActive', httpOptions);
  }
}
