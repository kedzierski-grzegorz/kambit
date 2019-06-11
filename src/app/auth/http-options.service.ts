import { Injectable } from '@angular/core';
import { TokenGetterService } from './token-getter.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpOptionsService {

  constructor(private token: TokenGetterService) { }

  getOptions(withAuthorization = true, json = false) {
    return {
      headers: new HttpHeaders({
        'Content-Type': json ? 'application/json' : 'application/x-www-form-urlencoded',
        Authorization: withAuthorization ? this.token.getToken() : ''
      }),

      params: {}
    };
  }
}
