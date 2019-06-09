import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-cti',
  templateUrl: './cti.component.html',
  styleUrls: ['./cti.component.scss']
})
export class CtiComponent implements OnInit {

  constructor(private auth: AuthService) {

  }

  ngOnInit() {
  }

}
