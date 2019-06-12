import { Router } from '@angular/router';
import { CtiCampaignsService } from './shared/cti-campaigns.service';
import { CtiCampaign } from './shared/cti-campaign';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DialogRef, DialogService, DialogCloseResult } from '@progress/kendo-angular-dialog';

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
              private router: Router,
              private dialogService: DialogService) {}

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      filterName: ''
    });
  }

  filter(filterForm: FormGroup): void {
    this.listOfCtiCampaigns = null;
    this.ctiCampaigns.getCampaignsByName(filterForm.controls.filterName.value || '').subscribe(campaigns => {
      this.listOfCtiCampaigns = campaigns;
    });
  }

  clearFilter(): void {
    this.listOfCtiCampaigns = null;
    this.filterForm.reset();
    this.ctiCampaigns.getCampaignsByName('').subscribe(campaigns => {
      this.listOfCtiCampaigns = campaigns;
    });
  }

  removeCampaign(campaignId): void {
    alert('Remove ' + campaignId);
  }

  openDialog(id, name): void {
    const dialog: DialogRef = this.dialogService.open({
      title: name,
      content: 'Czy na pewno chcesz usunąć wybraną pozycję?',
      actions: [
          { text: 'Nie', primary: true },
          { text: 'Tak' }
      ],
      width: 450,
      height: 200,
      minWidth: 250
    });

    dialog.result.subscribe((result) => {
      if (result instanceof DialogCloseResult) {

      } else if (result.text === 'Tak') {
        this.ctiCampaigns.deleteCampaignById(id).subscribe(() => this.clearFilter());
      }
    });
  }

}
