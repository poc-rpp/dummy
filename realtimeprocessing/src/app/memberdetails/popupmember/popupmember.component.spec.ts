import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupmemberComponent } from './popupmember.component';

describe('PopupmemberComponent', () => {
  let component: PopupmemberComponent;
  let fixture: ComponentFixture<PopupmemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupmemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupmemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
