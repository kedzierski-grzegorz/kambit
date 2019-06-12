import { CtiCase } from './../shared/cti-case';
import { CtiCampaignsService } from './../shared/cti-campaigns.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CtiCampaign } from '../shared/cti-campaign';
import { DialogService, DialogCloseResult, DialogRef } from '@progress/kendo-angular-dialog';
import { CtiCasesEditorComponent } from '../cti-cases-editor/cti-cases-editor.component';

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
  campaignCases: CtiCase[] = [];

  constructor(private location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private ctiCampaigns: CtiCampaignsService,
              private dialogService: DialogService) {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getAllCampaignDetails();
  }

  ngOnInit() {}

  getAllCampaignDetails(): void {
    if (this.id !== 0) {
      this.ctiCampaigns.getCampaignById(this.id).subscribe((campaign: CtiCampaign) => {
        this.name = campaign.Nazwa;
        this.flgTelStac = campaign.flgTelStac;
        this.flgGSM = campaign.flgGSM;
        this.flgTelOsKon = campaign.flgTelOsKon;
        this.note = campaign.Notatka;
        this.campaign = campaign;
      });

      this.ctiCampaigns.getCampaignCasesOfCampaign(this.id).subscribe(
        campaignCases => {
          this.campaignCases = campaignCases;
        }
      );
    }
  }

  back(): void {
    this.location.back();
  }

  save(): void {
    if (!this.name) {
      return;
    }

    this.isSaving = true;
    this.campaign.Id = this.id;
    this.campaign.Nazwa = this.name;
    this.campaign.flgTelStac = this.flgTelStac;
    this.campaign.flgGSM = this.flgGSM;
    this.campaign.flgTelOsKon = this.flgTelOsKon;
    this.campaign.Notatka = this.note;

    this.ctiCampaigns.setCampaign(this.campaign).subscribe(
      (res: { Id: number }) => {
        this.wasSavedCorrectly = true;
        this.message.nativeElement.style.display = 'flex';
        this.isSaving = false;
        this.id = res.Id;
        this.getAllCampaignDetails();
        this.router.navigate([`cti/edit/${res.Id}`], { replaceUrl: true });
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

  addCases(): void {
    const dialogRef = this.dialogService.open({
      title: 'Wybierz zlecenia',
      content: CtiCasesEditorComponent,
      actions: []
    });

    const userInfo = dialogRef.content.instance;
    userInfo.id = this.id;
    userInfo.dialog = dialogRef;

    dialogRef.result.subscribe((result) => {
      if (result instanceof DialogCloseResult) {
        this.getAllCampaignDetails();
      }
    });
  }

  removeCase(caseId, caseName): void {
    const dialog: DialogRef = this.dialogService.open({
      title: caseName,
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
        this.ctiCampaigns.deleteCampaignPosition(this.id, caseId).subscribe(
          () => this.getAllCampaignDetails()
        );
      }
    });
  }
}
