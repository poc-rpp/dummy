import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimspopupComponent } from './claimspopup.component';

describe('ClaimspopupComponent', () => {
  let component: ClaimspopupComponent;
  let fixture: ComponentFixture<ClaimspopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimspopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimspopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
