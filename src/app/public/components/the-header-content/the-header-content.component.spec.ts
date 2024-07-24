import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheHeaderContentComponent } from './the-header-content.component';

describe('TheHeaderContentComponent', () => {
  let component: TheHeaderContentComponent;
  let fixture: ComponentFixture<TheHeaderContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheHeaderContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheHeaderContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
