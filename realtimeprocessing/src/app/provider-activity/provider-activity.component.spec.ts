import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderActivityComponent } from './provider-activity.component';

describe('ProviderActivityComponent', () => {
  let component: ProviderActivityComponent;
  let fixture: ComponentFixture<ProviderActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
