import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder) {
    (document.querySelector('kambit-header') as HTMLElement).style.setProperty('display', 'none');
    (document.querySelector('kambit-footer') as HTMLElement).style.setProperty('display', 'none');

    if (auth.isAuthenticated()) {
      router.navigate(['']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      company: '',
      login: '',
      password: '',
      rememberMe: false
    });
  }

  login(form: FormGroup): void {
    console.log(form.value);
  }
}
