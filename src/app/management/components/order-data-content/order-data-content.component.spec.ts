import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDataContentComponent } from './order-data-content.component';

describe('OrderDataContentComponent', () => {
  let component: OrderDataContentComponent;
  let fixture: ComponentFixture<OrderDataContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDataContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDataContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
