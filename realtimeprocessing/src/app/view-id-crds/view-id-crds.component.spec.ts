import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIdCrdsComponent } from './view-id-crds.component';

describe('ViewIdCrdsComponent', () => {
  let component: ViewIdCrdsComponent;
  let fixture: ComponentFixture<ViewIdCrdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewIdCrdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIdCrdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
