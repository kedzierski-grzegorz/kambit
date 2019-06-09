import { Injectable } from '@angular/core';
import { TokenGetterService } from './token-getter.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpOptionsService {

  constructor(private token: TokenGetterService) { }

  getOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: this.token.getToken()
      })
    };
  }
}
