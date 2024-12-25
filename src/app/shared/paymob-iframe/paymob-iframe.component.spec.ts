import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymobIframeComponent } from './paymob-iframe.component';

describe('PaymobIframeComponent', () => {
  let component: PaymobIframeComponent;
  let fixture: ComponentFixture<PaymobIframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymobIframeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymobIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
