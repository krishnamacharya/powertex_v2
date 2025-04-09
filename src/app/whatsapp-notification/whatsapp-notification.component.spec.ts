import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappNotificationComponent } from './whatsapp-notification.component';

describe('WhatsappNotificationComponent', () => {
  let component: WhatsappNotificationComponent;
  let fixture: ComponentFixture<WhatsappNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhatsappNotificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsappNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
