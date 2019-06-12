import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtiCasesComponent } from './cti-cases.component';

describe('CtiCasesComponent', () => {
  let component: CtiCasesComponent;
  let fixture: ComponentFixture<CtiCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtiCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtiCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
