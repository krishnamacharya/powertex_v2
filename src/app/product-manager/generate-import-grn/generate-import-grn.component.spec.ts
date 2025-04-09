import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateImportGrnComponent } from './generate-import-grn.component';

describe('GenerateImportGrnComponent', () => {
  let component: GenerateImportGrnComponent;
  let fixture: ComponentFixture<GenerateImportGrnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateImportGrnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateImportGrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
