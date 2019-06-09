import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  incorrectData = false;
  loginForm: FormGroup;

  constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder) {
    auth.isSessionActive().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        router.navigate(['']);
      }
    });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      firm: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: false
    });
  }

  login(form: FormGroup): void {
    this.incorrectData = false;

    Object.keys(form.controls).forEach((input) => {
      form.controls[input].markAsDirty();
    });

    if (form.valid) {
      this.auth.signIn(form.controls.firm.value, form.controls.login.value, form.controls.password.value).toPromise()
        .then(res => {
          this.auth.setToken(res);
          this.router.navigate(['']);
        })
        .catch(err => {
          this.incorrectData = true;
        });
    }
  }
}
