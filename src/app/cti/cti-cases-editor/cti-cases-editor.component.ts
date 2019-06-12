import { CtiCase } from './../shared/cti-case';
import { Component, OnInit, Input } from '@angular/core';
import { CtiCaseFilter } from '../shared/cti-case-filter';
import { CtiCampaignsService } from '../shared/cti-campaigns.service';
import { DialogRef } from '@progress/kendo-angular-dialog';

@Component({
  selector: 'kambit-cti-cases-editor',
  templateUrl: './cti-cases-editor.component.html',
  styleUrls: ['./cti-cases-editor.component.scss']
})
export class CtiCasesEditorComponent implements OnInit {

  @Input()
  id: number;

  @Input()
  dialog: DialogRef;

  pageName = '';
  revisionNumber = '';
  nipPage = '';
  actSignature = '';
  bundle = '';

  cases: CtiCase[] = [];
  selectedCasesIds: number[] = [];

  constructor(private ctiCampaigns: CtiCampaignsService) { }

  ngOnInit() {
  }

  filter(): void {
    this.cases = null;
    const filter: CtiCaseFilter = {} as CtiCaseFilter;
    filter.campaignId = this.id;
    filter.pageName = this.pageName;
    filter.revisionNumber = this.revisionNumber;
    filter.nipPage = this.nipPage;
    filter.actSignature = this.actSignature;
    filter.bundle = this.bundle;

    this.ctiCampaigns.getCampaignCasesByFilter(filter).subscribe(
      cases => this.cases = cases
    );
  }

  saveSelected(): void {
    if (this.selectedCasesIds.length === 0 ) {
      return;
    }

    let keyIds = '';
    for (const id of this.selectedCasesIds) {
      keyIds += id + ';';
    }
    console.log(this.selectedCasesIds);
    console.log(keyIds);

    this.ctiCampaigns.setCampaignPositions(this.id, keyIds).subscribe(() => {
      this.dialog.close();
    });
  }

  selectCase(id) {
    if (this.selectedCasesIds.find(x => x === id)) {
      this.selectedCasesIds = this.selectedCasesIds.filter(x => x !== id);
    } else {
      this.selectedCasesIds.push(id);
    }
  }
}
