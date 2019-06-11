import { CtiCampaignsService } from './../shared/cti-campaigns.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CtiCampaign } from '../shared/cti-campaign';

@Component({
  selector: 'app-cti-editor',
  templateUrl: './cti-editor.component.html',
  styleUrls: ['./cti-editor.component.scss']
})
export class CtiEditorComponent implements OnInit {

  @ViewChild('message')
  message: ElementRef;

  id: number;
  name = '';
  flgTelStac = false;
  flgGSM = true;
  flgTelOsKon = false;
  note = '';

  wasSavedCorrectly = false;
  isSaving = false;

  campaign: CtiCampaign = {} as CtiCampaign;

  constructor(private location: Location, private route: ActivatedRoute, private ctiCampaigns: CtiCampaignsService) {
    this.id = +this.route.snapshot.paramMap.get('id');

    if (this.id !== 0) {
      this.ctiCampaigns.getCampaignById(this.id).subscribe((campaign: CtiCampaign) => {
        this.name = campaign.Nazwa;
        this.flgTelStac = campaign.flgTelStac;
        this.flgGSM = campaign.flgGSM;
        this.flgTelOsKon = campaign.flgTelOsKon;
        this.note = campaign.Notatka;
        this.campaign = campaign;
      });
    }
  }

  ngOnInit() {
  }

  back(): void {
    this.location.back();
  }

  save(): void {
    this.isSaving = true;
    this.campaign.Id = this.id;
    this.campaign.Nazwa = this.name;
    this.campaign.flgTelStac = this.flgTelStac;
    this.campaign.flgGSM = this.flgGSM;
    this.campaign.flgTelOsKon = this.flgTelOsKon;
    this.campaign.Notatka = this.note;

    this.ctiCampaigns.setCampaign(this.campaign).subscribe(
      res => {
        this.wasSavedCorrectly = true;
        this.message.nativeElement.style.display = 'flex';
        this.isSaving = false;
      },
      err => {
        this.wasSavedCorrectly = false;
        this.message.nativeElement.style.display = 'flex';
        this.isSaving = false;
      }
    );
  }

  closeMessage(): void {
    this.message.nativeElement.style.display = 'none';
  }
}
