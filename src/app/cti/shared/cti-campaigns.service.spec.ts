import { TestBed } from '@angular/core/testing';

import { CtiCampaignsService } from './cti-campaigns.service';

describe('CtiCampaignsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CtiCampaignsService = TestBed.get(CtiCampaignsService);
    expect(service).toBeTruthy();
  });
});
