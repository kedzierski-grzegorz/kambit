import { HttpOptionsService } from './../auth/http-options.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
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

  filter(filterInput): void {
    const body = new HttpParams();
    body.append('Nazwa', '');
    body.append('Id', '0');
    body.append('DataOd', '1900-01-01');
    body.append('DataDo', '1900-01-01');
    body.append('flgWeekendy', null);
    body.append('flgAktywna', null);
    body.append('flgTelStac', null);
    body.append('flgGSM', null);
    body.append('flgTelOsKon', null);
    body.append('IloscProb', '0');
    body.append('Notatka', '');

    const options = this.options.getOptions();
    options.params = body;


    this.http.get('https://hades.kambit.pl:1003/api/Cti/GetCampaigns', this.options.getOptions())
    .subscribe(res => {
      console.log(res);
    });
  }

}
