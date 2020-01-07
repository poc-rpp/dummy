import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewproviderloginComponent } from './newproviderlogin.component';

describe('NewproviderloginComponent', () => {
  let component: NewproviderloginComponent;
  let fixture: ComponentFixture<NewproviderloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewproviderloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewproviderloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
