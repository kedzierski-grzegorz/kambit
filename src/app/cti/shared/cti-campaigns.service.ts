import { CtiCase } from './cti-case';
import { Observable } from 'rxjs/Observable';
import { HttpOptionsService } from './../../auth/http-options.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CtiCampaign } from './cti-campaign';
import { environment } from 'src/environments/environment';
import { CtiCaseFilter } from './cti-case-filter';

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

  deleteCampaignById(campaignId) {
    return this.http.delete(environment.API_URL + 'Cti/DeleteCampaign/' + campaignId, this.httpOptions.getOptions());
  }

  setCampaign(campaign: CtiCampaign) {
    return this.http.post(environment.API_URL + 'Cti/SetCampaign', campaign, this.httpOptions.getOptions(true, true));
  }

  getCampaignCasesOfCampaign(campaignId) {
    const params = new HttpParams()
    .append('KampaniaId', campaignId)
    .append('StanSprawyIds', '0')
    .append('NrRepertorium', '')
    .append('UzytkownicyIds', '0')
    .append('SygnaturaAkt', '')
    .append('RodzajZleceniaIds', '0')
    .append('RezultatZleceniaIds', '0')
    .append('flgPrzypisani', 'true');

    const options = this.httpOptions.getOptions();
    options.params = params;

    return this.http.get<CtiCase[]>(environment.API_URL + 'Cti/GetCampaignCasesByFilter', options);
  }

  getCampaignCasesByFilter(filter: CtiCaseFilter) {
    const params = new HttpParams()
    .append('KampaniaId', filter.campaignId.toString())
    .append('Strona_Nazwa', filter.pageName)
    .append('NrRepertorium', filter.revisionNumber)
    .append('Strona_NIP', filter.nipPage)
    .append('SygnaturaAkt', filter.actSignature)
    .append('Pakiet', filter.bundle)
    .append('SygnaturaAkt', '')
    .append('RodzajZleceniaIds', '0')
    .append('RezultatZleceniaIds', '0')
    .append('UzytkownicyIds', '0')
    .append('StanSprawyIds', '0')
    .append('flgPrzypisani', 'false');

    const options = this.httpOptions.getOptions();
    options.params = params;

    return this.http.get<CtiCase[]>(environment.API_URL + 'Cti/GetCampaignCasesByFilter', options);
  }

  setCampaignPositions(campaignId, keyIds) {
    const body = {
      KampaniaId: campaignId,
      KeyIds: keyIds,
      flgTyp: 2
    };

    return this.http.post(environment.API_URL + 'Cti/SetCampaignPositions', body, this.httpOptions.getOptions(true, true));
  }

  deleteCampaignPosition(campaignId, keyId) {
    const options = this.httpOptions.getOptions(true, true);

    const body = JSON.stringify(
      {
        KampaniaId: campaignId,
        KeyId: keyId,
        flgTyp: 2
      }
    );

    options.body = body;

    return this.http.delete(environment.API_URL + 'Cti/DeleteCampaignPosition', options);
  }
}
