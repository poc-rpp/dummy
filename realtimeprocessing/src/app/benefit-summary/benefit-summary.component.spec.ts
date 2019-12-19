import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitSummaryComponent } from './benefit-summary.component';

describe('BenefitSummaryComponent', () => {
  let component: BenefitSummaryComponent;
  let fixture: ComponentFixture<BenefitSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenefitSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
