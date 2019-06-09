import { HttpOptionsService } from './../auth/http-options.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-cti',
  templateUrl: './cti.component.html',
  styleUrls: ['./cti.component.scss']
})
export class CtiComponent implements OnInit {

  constructor(private auth: AuthService, private http: HttpClient, private options: HttpOptionsService) {}

  ngOnInit() {
    const body = new URLSearchParams();
    body.set('id', '7');

    this.http.get('https://hades.kambit.pl:1003/api/Cti/GetCampaign/7', this.options.getOptions())
    .subscribe(res => {
      console.log(res);
    });
  }

}
