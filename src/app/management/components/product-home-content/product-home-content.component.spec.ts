import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductHomeContentComponent } from './product-home-content.component';

describe('ProductHomeContentComponent', () => {
  let component: ProductHomeContentComponent;
  let fixture: ComponentFixture<ProductHomeContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductHomeContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductHomeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
