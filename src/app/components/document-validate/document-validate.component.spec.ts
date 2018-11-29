import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentValidateComponent } from './document-validate.component';

describe('DocumentValidateComponent', () => {
  let component: DocumentValidateComponent;
  let fixture: ComponentFixture<DocumentValidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentValidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
