import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmailapiComponent } from './gmailapi.component';

describe('GmailapiComponent', () => {
  let component: GmailapiComponent;
  let fixture: ComponentFixture<GmailapiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmailapiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmailapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
