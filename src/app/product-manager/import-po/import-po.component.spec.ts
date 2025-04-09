import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportPoComponent } from './import-po.component';

describe('ImportPoComponent', () => {
  let component: ImportPoComponent;
  let fixture: ComponentFixture<ImportPoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportPoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
