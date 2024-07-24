import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingContentComponent } from './shopping-content.component';

describe('ShoppingContentComponent', () => {
  let component: ShoppingContentComponent;
  let fixture: ComponentFixture<ShoppingContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
