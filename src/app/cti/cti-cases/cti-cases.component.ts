import { Component, OnInit, Input } from '@angular/core';
import { DialogCloseResult, DialogService, DialogRef } from '@progress/kendo-angular-dialog';
import { CtiCampaignsService } from '../shared/cti-campaigns.service';
import { CtiCase } from '../shared/cti-case';
import { CtiCasesEditorComponent } from '../cti-cases-editor/cti-cases-editor.component';

@Component({
  selector: 'kambit-cti-cases',
  templateUrl: './cti-cases.component.html',
  styleUrls: ['./cti-cases.component.scss']
})
export class CtiCasesComponent implements OnInit {

  @Input()
  campaignId: number;

  campaignCases: CtiCase[] = [];

  constructor(private dialogService: DialogService, private ctiCampaigns: CtiCampaignsService) { }

  ngOnInit() {
  }

  getAllCampaignCases() {
    this.ctiCampaigns.getCampaignCasesOfCampaign(this.campaignId).subscribe(
      campaignCases => {
        this.campaignCases = campaignCases;
      }
    );
  }

  addCases(): void {
    const dialogRef = this.dialogService.open({
      title: 'Wybierz zlecenia',
      content: CtiCasesEditorComponent,
      actions: []
    });

    const userInfo = dialogRef.content.instance;
    userInfo.id = this.campaignId;
    userInfo.dialog = dialogRef;

    dialogRef.result.subscribe((result) => {
      if (result instanceof DialogCloseResult) {
        this.getAllCampaignCases();
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
        this.ctiCampaigns.deleteCampaignPosition(this.campaignId, caseId).subscribe(
          () => this.getAllCampaignCases()
        );
      }
    });
  }
}
