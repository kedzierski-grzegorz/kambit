import { Observable } from 'rxjs/Observable';
import { HttpOptionsService } from './../../auth/http-options.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CtiCampaign } from './cti-campaign';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CtiCampaignsService {

  constructor(private http: HttpClient, private httpOptions: HttpOptionsService) {}

  getCampaignsByName(name: string) {
    const params = new HttpParams().append('Nazwa', name);

    const options = this.httpOptions.getOptions();
    options.params = params;

    return this.http.get<CtiCampaign[]>(environment.API_URL + 'Cti/GetCampaigns', options);
  }

  getCampaignById(campaignId) {
    return this.http.get<CtiCampaign>(environment.API_URL + 'Cti/GetCampaign/' + campaignId, this.httpOptions.getOptions());
  }

  setCampaign(campaign: CtiCampaign) {
    return this.http.post(environment.API_URL + 'Cti/SetCampaign', campaign, this.httpOptions.getOptions(true, true));
  }
}
