import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtiEditorComponent } from './cti-editor.component';

describe('CtiEditorComponent', () => {
  let component: CtiEditorComponent;
  let fixture: ComponentFixture<CtiEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtiEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtiEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
