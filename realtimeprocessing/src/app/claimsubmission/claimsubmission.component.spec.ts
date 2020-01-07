import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsubmissionComponent } from './claimsubmission.component';

describe('ClaimsubmissionComponent', () => {
  let component: ClaimsubmissionComponent;
  let fixture: ComponentFixture<ClaimsubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimsubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
