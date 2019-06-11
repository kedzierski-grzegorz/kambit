import { CtiCampaignsService } from './../shared/cti-campaigns.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CtiCampaign } from '../shared/cti-campaign';

@Component({
  selector: 'app-cti-editor',
  templateUrl: './cti-editor.component.html',
  styleUrls: ['./cti-editor.component.scss']
})
export class CtiEditorComponent implements OnInit {

  id: number;
  name = '';
  flgTelStac = false;
  flgGSM = true;
  flgTelOsKon = false;
  note = '';

  constructor(private location: Location, private route: ActivatedRoute, private ctiCampaigns: CtiCampaignsService) {
    this.id = +this.route.snapshot.paramMap.get('id');

    if (this.id !== 0) {
      this.ctiCampaigns.getCampaignById(this.id).subscribe((campaign: CtiCampaign) => {
        this.name = campaign.Nazwa;
        this.flgTelStac = campaign.flgTelStac;
        this.flgGSM = campaign.flgGSM;
        this.flgTelOsKon = campaign.flgTelOsKon;
        this.note = campaign.Notatka;
      });
    }
  }

  ngOnInit() {
  }

  back(): void {
    this.location.back();
  }

  save(): void {
    console.log({
      name: this.name,
      flgTelStac: this.flgTelStac,
      flgGSM: this.flgGSM,
      flgTelOsKon: this.flgTelOsKon,
      note: this.note
    });
  }
}
