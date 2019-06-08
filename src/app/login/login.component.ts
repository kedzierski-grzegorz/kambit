import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) {
    (document.querySelector('kambit-header') as HTMLElement).style.setProperty('display', 'none');
    (document.querySelector('kambit-footer') as HTMLElement).style.setProperty('display', 'none');

    if (auth.isAuthenticated()) {
      router.navigate(['']);
    }
  }

  ngOnInit() {
  }

}
