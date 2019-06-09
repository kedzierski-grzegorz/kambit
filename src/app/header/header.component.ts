import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'kambit-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username: string;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.auth.getUser().subscribe(data => {this.username = data.userName;});
  }

  logout(): void {
    this.auth.logout();
    location.reload();
  }
}
