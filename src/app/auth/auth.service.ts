import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly API_URL = 'https://hades.kambit.pl:1003/api/';

  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean {
    this.isSessionActive();
    return true;
  }

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

  setToken(response): void {
    localStorage.setItem('firm', response.firmId);
    localStorage.setItem('login', response.userName);
    localStorage.setItem('loggedUser', JSON.stringify(response));
    localStorage.setItem('loggedUserCti', JSON.stringify(response));
  }

  logout(): void {
    localStorage.removeItem('firm');
    localStorage.removeItem('login');
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('loggedUserCti');
  }

  isSessionActive() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: JSON.parse(localStorage.getItem('loggedUser')).token
      })
    };
    this.http.get(this.API_URL + 'Login/IsSessionActive', httpOptions).toPromise().then(res => {
      console.log(res);
    })
  }
}
