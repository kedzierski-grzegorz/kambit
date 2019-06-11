import { Router } from '@angular/router';
import { CtiCampaignsService } from './shared/cti-campaigns.service';
import { CtiCampaign } from './shared/cti-campaign';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cti',
  templateUrl: './cti.component.html',
  styleUrls: ['./cti.component.scss']
})
export class CtiComponent implements OnInit {

  listOfCtiCampaigns: CtiCampaign[] = [];
  filterForm: FormGroup;

  constructor(private ctiCampaigns: CtiCampaignsService,
              private formBuilder: FormBuilder,
              private router: Router) {}

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      filterName: ''
    });
  }

  filter(filterForm: FormGroup): void {
    this.listOfCtiCampaigns = null;
    this.ctiCampaigns.getCampaignByName(filterForm.controls.filterName.value || '').subscribe(campaigns => {
      this.listOfCtiCampaigns = campaigns;
    });
  }

  clearFilter(): void {
    this.listOfCtiCampaigns = null;
    this.filterForm.reset();
    this.ctiCampaigns.getCampaignByName('').subscribe(campaigns => {
      this.listOfCtiCampaigns = campaigns;
    });
  }

  removeCampaign(campaignId): void {
    alert('Remove ' + campaignId);
  }

}
