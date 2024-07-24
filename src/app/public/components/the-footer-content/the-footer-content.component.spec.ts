import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheFooterContentComponent } from './the-footer-content.component';

describe('TheFooterContentComponent', () => {
  let component: TheFooterContentComponent;
  let fixture: ComponentFixture<TheFooterContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheFooterContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheFooterContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
