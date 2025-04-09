import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportPoPrintComponent } from './import-po-print.component';

describe('ImportPoPrintComponent', () => {
  let component: ImportPoPrintComponent;
  let fixture: ComponentFixture<ImportPoPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportPoPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportPoPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
