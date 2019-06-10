import { CtiCampaign } from './shared/cti-campaign';
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

  listOfCtiCampaigns: CtiCampaign[];

  constructor(private auth: AuthService, private http: HttpClient, private options: HttpOptionsService) {}

  ngOnInit() {
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


    this.http.get<CtiCampaign[]>('https://hades.kambit.pl:1003/api/Cti/GetCampaigns', this.options.getOptions())
    .subscribe(res => {
      this.listOfCtiCampaigns = res;
    });
  }

}
