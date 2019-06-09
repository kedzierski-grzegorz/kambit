import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenGetterService {
  getToken(): string {
    return sessionStorage.getItem('token') || localStorage.getItem('token') || '';
  }
}
