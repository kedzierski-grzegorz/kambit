import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtiCasesEditorComponent } from './cti-cases-editor.component';

describe('CtiCasesEditorComponent', () => {
  let component: CtiCasesEditorComponent;
  let fixture: ComponentFixture<CtiCasesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtiCasesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtiCasesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
